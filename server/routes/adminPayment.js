import express from 'express'
import Payment from '../models/Payment.js'
import Property from '../models/Property.js'
import { auth, adminAuth } from '../middleware/auth.js'

const router = express.Router()

// Lấy tất cả thanh toán (Admin)
router.get('/all', auth, adminAuth, async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query

        const query = {}
        if (status) {
            query.status = status
        }

        const payments = await Payment.find(query)
            .populate('property', 'title image price location')
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)

        const total = await Payment.countDocuments(query)

        res.json({
            success: true,
            data: {
                payments,
                pagination: {
                    total,
                    page: parseInt(page),
                    pages: Math.ceil(total / limit)
                }
            }
        })
    } catch (error) {
        console.error('Get all payments error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi lấy danh sách thanh toán'
        })
    }
})

// Xác nhận thanh toán (Admin)
router.put('/confirm/:paymentId', auth, adminAuth, async (req, res) => {
    try {
        const { paymentId } = req.params
        const { adminNote } = req.body

        const payment = await Payment.findById(paymentId)
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn thanh toán'
            })
        }

        // Cập nhật payment
        payment.status = 'completed'
        payment.confirmedBy = req.user._id
        payment.confirmedAt = new Date()
        if (adminNote) {
            payment.adminNote = adminNote
        }
        await payment.save()

        // Cập nhật property
        const property = await Property.findById(payment.property)
        if (property) {
            property.payment.isPaid = true
            property.payment.amount = payment.amount
            property.payment.paymentStatus = 'completed'
            property.payment.paidAt = new Date()
            property.payment.transactionId = payment._id
            property.isActive = true
            property.expiresAt = payment.endDate
            await property.save()
        }

        res.json({
            success: true,
            message: 'Xác nhận thanh toán thành công',
            data: payment
        })
    } catch (error) {
        console.error('Confirm payment error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi xác nhận thanh toán'
        })
    }
})

// Từ chối thanh toán (Admin)
router.put('/reject/:paymentId', auth, adminAuth, async (req, res) => {
    try {
        const { paymentId } = req.params
        const { adminNote } = req.body

        const payment = await Payment.findById(paymentId)
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn thanh toán'
            })
        }

        payment.status = 'failed'
        payment.confirmedBy = req.user._id
        payment.confirmedAt = new Date()
        payment.adminNote = adminNote || 'Thông tin chuyển khoản không hợp lệ'
        await payment.save()

        res.json({
            success: true,
            message: 'Đã từ chối thanh toán',
            data: payment
        })
    } catch (error) {
        console.error('Reject payment error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi từ chối thanh toán'
        })
    }
})

export default router
