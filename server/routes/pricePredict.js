import express from 'express'
import Property from '../models/Property.js'

const router = express.Router()

// Dự đoán giá bất động sản dựa trên thống kê
router.post('/', async (req, res) => {
    try {
        const { 
            area,           // Diện tích (m2)
            district,       // Quận/Huyện
            propertyType,   // Loại BĐS
            bedrooms,       // Số phòng ngủ
            bathrooms,      // Số phòng tắm
            city            // Thành phố (optional)
        } = req.body

        if (!area || area <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập diện tích hợp lệ'
            })
        }

        // Xây dựng query để tìm các BĐS tương tự
        const similarQuery = {
            status: 'available',
            approvalStatus: 'approved',
            price: { $gt: 0 },
            area: { $gt: 0 }
        }

        // Các điều kiện matching
        const matchConditions = []

        // Match chính xác: Cùng quận, cùng loại, diện tích tương tự
        if (district && propertyType) {
            matchConditions.push({
                'address.district': { $regex: district, $options: 'i' },
                propertyType: propertyType,
                area: { $gte: area * 0.7, $lte: area * 1.3 }
            })
        }

        // Match rộng hơn: Cùng quận, diện tích tương tự
        if (district) {
            matchConditions.push({
                'address.district': { $regex: district, $options: 'i' },
                area: { $gte: area * 0.5, $lte: area * 1.5 }
            })
        }

        // Match rộng nhất: Cùng loại, diện tích tương tự
        if (propertyType) {
            matchConditions.push({
                propertyType: propertyType,
                area: { $gte: area * 0.5, $lte: area * 1.5 }
            })
        }

        // Fallback: Chỉ theo diện tích
        matchConditions.push({
            area: { $gte: area * 0.3, $lte: area * 2 }
        })

        // Tìm các BĐS tương tự theo từng mức độ match
        let similarProperties = []
        let matchLevel = ''

        for (let i = 0; i < matchConditions.length && similarProperties.length < 5; i++) {
            const query = { ...similarQuery, ...matchConditions[i] }
            similarProperties = await Property.find(query)
                .select('price area propertyType address bedrooms bathrooms')
                .limit(50)
            
            if (similarProperties.length >= 3) {
                matchLevel = i === 0 ? 'high' : i === 1 ? 'medium' : i === 2 ? 'low' : 'very_low'
                break
            }
        }

        if (similarProperties.length === 0) {
            return res.json({
                success: true,
                prediction: null,
                message: 'Không đủ dữ liệu để dự đoán. Vui lòng thử với khu vực khác.'
            })
        }

        // Tính toán giá dự đoán
        const pricesPerSqm = similarProperties.map(p => p.price / p.area)
        const avgPricePerSqm = pricesPerSqm.reduce((a, b) => a + b, 0) / pricesPerSqm.length

        // Tính standard deviation
        const variance = pricesPerSqm.reduce((sum, p) => sum + Math.pow(p - avgPricePerSqm, 2), 0) / pricesPerSqm.length
        const stdDev = Math.sqrt(variance)

        // Điều chỉnh theo số phòng ngủ (rough estimate)
        let bedroomAdjustment = 1
        if (bedrooms) {
            const avgBedrooms = similarProperties.reduce((sum, p) => sum + (p.bedrooms || 0), 0) / similarProperties.length
            if (bedrooms > avgBedrooms) {
                bedroomAdjustment = 1 + (bedrooms - avgBedrooms) * 0.05 // +5% per extra bedroom
            } else if (bedrooms < avgBedrooms) {
                bedroomAdjustment = 1 - (avgBedrooms - bedrooms) * 0.03 // -3% per missing bedroom
            }
        }

        // Tính giá dự đoán
        const predictedPrice = avgPricePerSqm * area * bedroomAdjustment
        const minPrice = (avgPricePerSqm - stdDev) * area * bedroomAdjustment
        const maxPrice = (avgPricePerSqm + stdDev) * area * bedroomAdjustment

        // Confidence score dựa trên số lượng mẫu và match level
        let confidence = Math.min(100, 50 + similarProperties.length * 5)
        if (matchLevel === 'high') confidence = Math.min(100, confidence + 20)
        else if (matchLevel === 'medium') confidence = Math.min(100, confidence + 10)
        else if (matchLevel === 'low') confidence = Math.max(30, confidence - 10)
        else confidence = Math.max(20, confidence - 20)

        res.json({
            success: true,
            prediction: {
                estimatedPrice: Math.round(predictedPrice),
                minPrice: Math.round(Math.max(0, minPrice)),
                maxPrice: Math.round(maxPrice),
                pricePerSqm: Math.round(avgPricePerSqm),
                confidence: Math.round(confidence),
                sampleSize: similarProperties.length,
                matchLevel: matchLevel
            },
            factors: {
                area: area,
                district: district || 'Không xác định',
                propertyType: propertyType || 'Không xác định',
                bedrooms: bedrooms || 0
            },
            disclaimer: 'Giá dự đoán chỉ mang tính tham khảo, dựa trên phân tích thống kê từ dữ liệu thị trường. Giá thực tế có thể khác biệt tùy vào nhiều yếu tố như tình trạng nhà, pháp lý, thương lượng...'
        })

    } catch (error) {
        console.error('Price prediction error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi khi dự đoán giá: ' + error.message
        })
    }
})

// Lấy thống kê giá theo khu vực
router.get('/stats', async (req, res) => {
    try {
        const stats = await Property.aggregate([
            { 
                $match: { 
                    status: 'available', 
                    approvalStatus: 'approved',
                    price: { $gt: 0 },
                    area: { $gt: 0 }
                } 
            },
            {
                $group: {
                    _id: {
                        district: '$address.district',
                        type: '$propertyType'
                    },
                    avgPrice: { $avg: '$price' },
                    avgPricePerSqm: { $avg: { $divide: ['$price', '$area'] } },
                    count: { $sum: 1 },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 20 }
        ])

        res.json({
            success: true,
            stats: stats.map(s => ({
                district: s._id.district || 'Không xác định',
                propertyType: s._id.type,
                avgPrice: Math.round(s.avgPrice),
                avgPricePerSqm: Math.round(s.avgPricePerSqm),
                minPrice: s.minPrice,
                maxPrice: s.maxPrice,
                sampleCount: s.count
            }))
        })

    } catch (error) {
        console.error('Get price stats error:', error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

export default router
