import express from 'express'
import jwt from 'jsonwebtoken'
import Property from '../models/Property.js'

const router = express.Router()

// Lấy Gemini API key từ env
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

// Helper: Lấy user ID từ token (optional)
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

// Lấy context về thị trường BĐS hiện tại
async function getMarketContext() {
    try {
        // Thống kê nhanh từ database
        const totalProperties = await Property.countDocuments({ 
            status: 'available', 
            approvalStatus: 'approved' 
        })
        
        const priceStats = await Property.aggregate([
            { $match: { status: 'available', approvalStatus: 'approved', price: { $gt: 0 } } },
            { 
                $group: { 
                    _id: '$propertyType',
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                    count: { $sum: 1 }
                } 
            }
        ])

        const hotLocations = await Property.aggregate([
            { $match: { status: 'available', approvalStatus: 'approved' } },
            { $group: { _id: '$address.district', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ])

        return {
            totalProperties,
            priceByType: priceStats,
            hotLocations: hotLocations.map(l => l._id).filter(Boolean)
        }
    } catch (error) {
        console.error('Get market context error:', error)
        return { totalProperties: 0, priceByType: [], hotLocations: [] }
    }
}

// Format giá VND
function formatPrice(price) {
    if (price >= 1000000000) {
        return (price / 1000000000).toFixed(1) + ' tỷ'
    } else if (price >= 1000000) {
        return (price / 1000000).toFixed(0) + ' triệu'
    }
    return price.toLocaleString('vi-VN') + ' VNĐ'
}

// Tạo system prompt với context thị trường
async function buildSystemPrompt() {
    const context = await getMarketContext()
    
    let priceInfo = ''
    if (context.priceByType.length > 0) {
        priceInfo = context.priceByType.map(p => 
            `- ${p._id}: Trung bình ${formatPrice(p.avgPrice)}, có ${p.count} tin`
        ).join('\n')
    }

    return `Bạn là trợ lý AI chuyên về bất động sản Việt Nam. Tên bạn là "BĐS Assistant".

NHIỆM VỤ:
- Tư vấn mua bán, cho thuê bất động sản
- Giải đáp thắc mắc về thủ tục pháp lý, giấy tờ
- Gợi ý khu vực phù hợp theo ngân sách và nhu cầu
- Đưa ra lời khuyên về đầu tư BĐS

THÔNG TIN THỊ TRƯỜNG HIỆN TẠI:
- Tổng số tin đăng: ${context.totalProperties} tin
- Khu vực hot: ${context.hotLocations.join(', ') || 'Đang cập nhật'}
- Giá theo loại hình:
${priceInfo || '(Đang cập nhật)'}

QUY TẮC:
1. Trả lời ngắn gọn, dễ hiểu, thân thiện
2. Dùng tiếng Việt chuẩn
3. Nếu không chắc chắn, hãy nói rõ đó là ước tính
4. Khuyến khích người dùng liên hệ chuyên gia khi cần thiết
5. Không đưa ra lời khuyên pháp lý cụ thể - chỉ cung cấp thông tin chung
6. Trả lời tối đa 200 từ`
}

// Chat endpoint
router.post('/message', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body

        if (!message || message.trim() === '') {
            return res.status(400).json({ 
                success: false, 
                message: 'Vui lòng nhập tin nhắn' 
            })
        }

        // Kiểm tra API key
        if (!GEMINI_API_KEY) {
            // Fallback: Trả lời tự động không cần API
            const fallbackResponse = generateFallbackResponse(message)
            return res.json({
                success: true,
                response: fallbackResponse,
                isAI: false
            })
        }

        // Gọi Gemini API
        const systemPrompt = await buildSystemPrompt()
        
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: systemPrompt + '\n\nNgười dùng hỏi: ' + message }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500
                    }
                })
            }
        )

        if (!response.ok) {
            throw new Error('Gemini API error: ' + response.status)
        }

        const data = await response.json()
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
            'Xin lỗi, tôi không thể trả lời lúc này. Vui lòng thử lại sau.'

        res.json({
            success: true,
            response: aiResponse,
            isAI: true
        })

    } catch (error) {
        console.error('Chatbot error:', error)
        
        // Fallback response
        const fallbackResponse = generateFallbackResponse(req.body.message)
        res.json({
            success: true,
            response: fallbackResponse,
            isAI: false
        })
    }
})

// Fallback responses khi không có API key hoặc lỗi
function generateFallbackResponse(message) {
    const lowerMsg = message.toLowerCase()
    
    if (lowerMsg.includes('giá') || lowerMsg.includes('bao nhiêu')) {
        return 'Giá bất động sản phụ thuộc vào nhiều yếu tố như vị trí, diện tích, loại hình. Bạn có thể sử dụng tính năng "Ước tính giá" trên website để có con số tham khảo, hoặc liên hệ trực tiếp với chủ nhà qua thông tin trong tin đăng.'
    }
    
    if (lowerMsg.includes('mua') || lowerMsg.includes('bán')) {
        return 'Để mua/bán bất động sản, bạn nên:\n1. Xác định ngân sách và nhu cầu\n2. Tìm kiếm trên website theo bộ lọc phù hợp\n3. Liên hệ chủ nhà/môi giới để xem thực tế\n4. Kiểm tra pháp lý trước khi giao dịch\n\nBạn cần tư vấn cụ thể hơn về vấn đề gì?'
    }
    
    if (lowerMsg.includes('thuê') || lowerMsg.includes('cho thuê')) {
        return 'Khi thuê nhà, bạn nên lưu ý:\n1. Xem kỹ hợp đồng thuê\n2. Kiểm tra điều kiện thanh toán (đặt cọc, tiền thuê)\n3. Xác nhận các chi phí phát sinh (điện, nước, internet)\n4. Chụp ảnh hiện trạng trước khi nhận nhà\n\nBạn đang tìm thuê ở khu vực nào?'
    }
    
    if (lowerMsg.includes('khu vực') || lowerMsg.includes('quận') || lowerMsg.includes('ở đâu')) {
        return 'Một số khu vực đang được quan tâm nhiều: Quận 1, Quận 7, Thủ Đức, Bình Thạnh (TP.HCM), Cầu Giấy, Thanh Xuân (Hà Nội). Bạn có thể dùng bộ lọc trên website để tìm BĐS theo khu vực mong muốn.'
    }
    
    if (lowerMsg.includes('pháp lý') || lowerMsg.includes('sổ đỏ') || lowerMsg.includes('sổ hồng')) {
        return 'Về pháp lý BĐS:\n- Sổ đỏ: Giấy chứng nhận quyền sử dụng đất\n- Sổ hồng: Giấy chứng nhận quyền sở hữu nhà ở\n\nKhi mua, bạn cần kiểm tra: tính pháp lý của sổ, quy hoạch, và nên nhờ công chứng viên xác nhận giao dịch.'
    }
    
    return 'Xin chào! Tôi là trợ lý BĐS. Tôi có thể giúp bạn:\n- Tư vấn mua/bán/thuê nhà\n- Thông tin về giá cả thị trường\n- Hướng dẫn thủ tục pháp lý\n\nBạn cần hỗ trợ gì ạ?'
}

// Get quick suggestions
router.get('/suggestions', async (req, res) => {
    res.json({
        suggestions: [
            'Khu vực nào đang hot?',
            'Giá căn hộ trung bình bao nhiêu?',
            'Thủ tục mua nhà cần gì?',
            'Nên mua hay thuê nhà?'
        ]
    })
})

export default router
