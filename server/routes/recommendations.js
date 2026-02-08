import express from 'express'
import jwt from 'jsonwebtoken'
import Property from '../models/Property.js'
import User from '../models/User.js'

const router = express.Router()

// Middleware xác thực (Optional - nếu có token thì dùng, không thì thôi)
const getUserId = (req) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        if (!token) return null
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
        return decoded.userId || decoded.id
    } catch (error) {
        return null
    }
}

// Ghi nhận lịch sử xem
router.post('/track-view', async (req, res) => {
    try {
        const userId = getUserId(req)
        const { propertyId } = req.body

        if (!userId || !propertyId) {
            // Nếu không đăng nhập hoặc thiếu ID, chỉ trả về success (client có thể lưu local storage nếu muốn)
            return res.json({ success: true, message: 'Tracked anonymously' })
        }

        const user = await User.findById(userId)
        if (user) {
            // Xóa entry cũ nếu đã có (để đưa lên đầu)
            user.viewHistory = user.viewHistory.filter(item => item.property.toString() !== propertyId)
            
            // Thêm vào đầu mảng
            user.viewHistory.unshift({
                property: propertyId,
                timestamp: new Date()
            })

            // Giới hạn lịch sử 50 mục
            if (user.viewHistory.length > 50) {
                user.viewHistory = user.viewHistory.slice(0, 50)
            }

            await user.save()
        }

        // Tăng view count cho property
        await Property.findByIdAndUpdate(propertyId, { $inc: { views: 1 } })

        res.json({ success: true })
    } catch (error) {
        console.error('Track view error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

// Ghi nhận lịch sử tìm kiếm
router.post('/track-search', async (req, res) => {
    try {
        const userId = getUserId(req)
        const { query } = req.body

        if (!userId || !query) {
            return res.json({ success: true, message: 'Tracked anonymously' })
        }

        const user = await User.findById(userId)
        if (user) {
            // Thêm vào đầu mảng searchHistory
            user.searchHistory.unshift({
                query: query,
                timestamp: new Date()
            })

            // Giới hạn 30 searches
            if (user.searchHistory.length > 30) {
                user.searchHistory = user.searchHistory.slice(0, 30)
            }

            await user.save()
        }

        res.json({ success: true })
    } catch (error) {
        console.error('Track search error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

// Lấy danh sách gợi ý (Kết hợp viewHistory + searchHistory)
router.get('/', async (req, res) => {
    try {
        const userId = getUserId(req)
        let query = { status: 'available', approvalStatus: 'approved' }
        
        // Mặc định: Lấy tin nổi bật/VIP nếu chưa có lịch sử
        let sort = { vip: -1, createdAt: -1 }

        if (userId) {
            const user = await User.findById(userId).populate('viewHistory.property')
            
            if (user) {
                // Phân tích preferences từ cả viewHistory và searchHistory
                const preferences = analyzeUserPreferences(user)
                
                if (preferences.hasData) {
                    const viewedIds = user.viewHistory
                        .filter(h => h.property)
                        .map(h => h.property._id)

                    query = buildRecommendationQuery(preferences, viewedIds)
                }
            }
        }

        // Lấy kết quả
        let recommendations = await Property.find(query)
            .sort(sort)
            .limit(8)
            .populate('userId', 'name avatar phone')

        // Nếu ít kết quả quá, bù thêm tin mới nhất
        if (recommendations.length < 4) {
            const ids = recommendations.map(p => p._id)
            const more = await Property.find({
                status: 'available',
                approvalStatus: 'approved',
                _id: { $nin: ids }
            })
            .sort({ vip: -1, createdAt: -1 })
            .limit(8 - recommendations.length)
            .populate('userId', 'name avatar phone')

            recommendations = [...recommendations, ...more]
        }

        res.json(recommendations)

    } catch (error) {
        console.error('Get recommendations error:', error)
        res.status(500).json({ message: error.message })
    }
})

// Phân tích preferences từ viewHistory và searchHistory
function analyzeUserPreferences(user) {
    const locations = {}
    const types = {}
    let totalPrice = 0
    let priceCount = 0
    let hasData = false

    // Phân tích từ viewHistory
    if (user.viewHistory && user.viewHistory.length > 0) {
        const history = user.viewHistory.filter(h => h.property)
        history.forEach(h => {
            const p = h.property
            hasData = true
            
            // Location
            if (p.address && p.address.district) {
                locations[p.address.district] = (locations[p.address.district] || 0) + 2 // Weight cao hơn cho views
            }
            // Type
            if (p.propertyType) {
                types[p.propertyType] = (types[p.propertyType] || 0) + 2
            }
            // Price
            if (p.price > 0) {
                totalPrice += p.price
                priceCount++
            }
        })
    }

    // Phân tích từ searchHistory
    if (user.searchHistory && user.searchHistory.length > 0) {
        user.searchHistory.forEach(s => {
            const q = s.query
            hasData = true
            
            // Location từ search
            if (q.location) {
                locations[q.location] = (locations[q.location] || 0) + 1
            }
            if (q.district) {
                locations[q.district] = (locations[q.district] || 0) + 1
            }
            // Type từ search
            if (q.propertyType) {
                types[q.propertyType] = (types[q.propertyType] || 0) + 1
            }
            // Price từ search (dùng mid-point)
            if (q.minPrice || q.maxPrice) {
                const searchPrice = ((q.minPrice || 0) + (q.maxPrice || q.minPrice * 2)) / 2
                if (searchPrice > 0) {
                    totalPrice += searchPrice
                    priceCount++
                }
            }
        })
    }

    // Tính top preferences
    const topDistricts = Object.keys(locations)
        .sort((a, b) => locations[b] - locations[a])
        .slice(0, 2)
    const topTypes = Object.keys(types)
        .sort((a, b) => types[b] - types[a])
        .slice(0, 2)
    const avgPrice = priceCount > 0 ? totalPrice / priceCount : 0

    return { topDistricts, topTypes, avgPrice, hasData }
}

// Xây dựng query gợi ý dựa trên preferences
function buildRecommendationQuery(preferences, excludeIds) {
    const { topDistricts, topTypes, avgPrice } = preferences

    const query = {
        status: 'available',
        approvalStatus: 'approved',
        _id: { $nin: excludeIds },
        $or: []
    }

    // Ưu tiên 1: Cùng quận + Cùng loại + Giá tương đương
    if (topDistricts.length > 0 && topTypes.length > 0 && avgPrice > 0) {
        query.$or.push({
            'address.district': { $in: topDistricts },
            propertyType: { $in: topTypes },
            price: { $gte: avgPrice * 0.7, $lte: avgPrice * 1.3 }
        })
    }

    // Ưu tiên 2: Cùng quận + Cùng loại
    if (topDistricts.length > 0 && topTypes.length > 0) {
        query.$or.push({
            'address.district': { $in: topDistricts },
            propertyType: { $in: topTypes }
        })
    }

    // Ưu tiên 3: Cùng quận
    if (topDistricts.length > 0) {
        query.$or.push({
            'address.district': { $in: topDistricts }
        })
    }

    // Ưu tiên 4: Cùng loại
    if (topTypes.length > 0) {
        query.$or.push({
            propertyType: { $in: topTypes }
        })
    }

    // Fallback nếu không có preference
    if (query.$or.length === 0) {
        delete query.$or
    }

    return query
}

export default router

