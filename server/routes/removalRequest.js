import express from 'express'
import Property from '../models/Property.js'
import { auth, adminAuth } from '../middleware/auth.js'

const router = express.Router()

// Gửi yêu cầu gỡ tin (User)
router.post('/create/:propertyId', auth, async (req, res) => {
    try {
        const { propertyId } = req.params
        const { reason } = req.body

        const property = await Property.findById(propertyId)
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tin đăng'
            })
        }

        // Kiểm tra quyền sở hữu
        if (property.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền gửi yêu cầu cho tin đăng này'
            })
        }

        // Kiểm tra đã gửi yêu cầu chưa
        if (property.removalRequest.isRequested && property.removalRequest.status === 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Bạn đã gửi yêu cầu gỡ tin. Vui lòng đợi admin xử lý.'
            })
        }

        // Cập nhật yêu cầu
        property.removalRequest = {
            isRequested: true,
            requestedAt: new Date(),
            reason: reason || 'Đã bán',
            status: 'pending'
        }
        property.status = 'sold' // Đánh dấu là đã bán
        await property.save()

        res.json({
            success: true,
            message: 'Gửi yêu cầu gỡ tin thành công. Admin sẽ xử lý trong thời gian sớm nhất.',
            data: property
        })
    } catch (error) {
        console.error('Create removal request error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi gửi yêu cầu gỡ tin'
        })
    }
})

// Lấy danh sách yêu cầu gỡ tin (Admin)
router.get('/all', auth, adminAuth, async (req, res) => {
    try {
        const { status = 'pending', page = 1, limit = 20 } = req.query

        const query = {
            'removalRequest.isRequested': true
        }
        if (status) {
            query['removalRequest.status'] = status
        }

        const properties = await Property.find(query)
            .populate('userId', 'name email phone')
            .sort({ 'removalRequest.requestedAt': -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)

        const total = await Property.countDocuments(query)

        res.json({
            success: true,
            data: {
                requests: properties,
                pagination: {
                    total,
                    page: parseInt(page),
                    pages: Math.ceil(total / limit)
                }
            }
        })
    } catch (error) {
        console.error('Get removal requests error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi lấy danh sách yêu cầu'
        })
    }
})

// Duyệt yêu cầu gỡ tin (Admin)
router.put('/approve/:propertyId', auth, adminAuth, async (req, res) => {
    try {
        const { propertyId } = req.params

        const property = await Property.findById(propertyId)
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tin đăng'
            })
        }

        // Cập nhật trạng thái
        property.removalRequest.status = 'approved'
        property.removalRequest.processedBy = req.user._id
        property.removalRequest.processedAt = new Date()
        property.isActive = false // Ẩn tin đăng
        property.status = 'sold'
        await property.save()

        res.json({
            success: true,
            message: 'Đã duyệt yêu cầu gỡ tin',
            data: property
        })
    } catch (error) {
        console.error('Approve removal request error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi duyệt yêu cầu'
        })
    }
})

// Từ chối yêu cầu gỡ tin (Admin)
router.put('/reject/:propertyId', auth, adminAuth, async (req, res) => {
    try {
        const { propertyId } = req.params
        const { reason } = req.body

        const property = await Property.findById(propertyId)
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tin đăng'
            })
        }

        property.removalRequest.status = 'rejected'
        property.removalRequest.processedBy = req.user._id
        property.removalRequest.processedAt = new Date()
        if (reason) {
            property.removalRequest.reason += ` (Admin: ${reason})`
        }
        property.status = 'available' // Trả về trạng thái available
        await property.save()

        res.json({
            success: true,
            message: 'Đã từ chối yêu cầu gỡ tin',
            data: property
        })
    } catch (error) {
        console.error('Reject removal request error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi từ chối yêu cầu'
        })
    }
})

export default router
