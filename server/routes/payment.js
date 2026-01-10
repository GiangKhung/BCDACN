import express from 'express'
import Payment from '../models/Payment.js'
import Property from '../models/Property.js'
import { auth } from '../middleware/auth.js'
import sepayService from '../services/sepayService.js'

const router = express.Router()

// Tính toán số tiền thanh toán
router.post('/calculate', auth, async (req, res) => {
    try {
        const { durationDays } = req.body

        if (!durationDays || durationDays < 30) {
            return res.status(400).json({
                success: false,
                message: 'Thời gian đăng tin tối thiểu là 30 ngày'
            })
        }

        const pricePerDay = 50000
        const amount = pricePerDay * durationDays

        res.json({
            success: true,
            data: {
                pricePerDay,
                durationDays,
                amount,
                amountFormatted: amount.toLocaleString('vi-VN') + ' VNĐ'
            }
        })
    } catch (error) {
        console.error('Calculate payment error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi tính toán thanh toán'
        })
    }
})

// Tạo đơn thanh toán
router.post('/create', auth, async (req, res) => {
    try {
        const { propertyId, durationDays, paymentMethod } = req.body

        // Validate
        if (!propertyId || !durationDays || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin thanh toán'
            })
        }

        if (durationDays < 30) {
            return res.status(400).json({
                success: false,
                message: 'Thời gian đăng tin tối thiểu là 30 ngày'
            })
        }

        // Kiểm tra property
        const property = await Property.findById(propertyId)
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tin đăng'
            })
        }

        // Kiểm tra quyền sở hữu (nếu property có userId)
        if (property.userId && property.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền thanh toán cho tin đăng này'
            })
        }

        // Tính toán
        const pricePerDay = 50000
        const amount = pricePerDay * durationDays
        const startDate = new Date()
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + durationDays)

        // Tạo payment
        const payment = await Payment.create({
            property: propertyId,
            user: req.user._id,
            amount,
            pricePerDay,
            durationDays,
            startDate,
            endDate,
            paymentMethod,
            status: 'pending'
        })

        // Cập nhật property
        property.payment = {
            isPaid: false,
            amount: 0,
            pricePerDay,
            durationDays,
            startDate,
            endDate,
            paymentMethod,
            paymentStatus: 'pending'
        }
        property.isActive = false
        await property.save()

        // Tạo response data
        let responseData = {
            payment
        }

        // Nếu là SePay QR, tạo QR code
        if (paymentMethod === 'sepay_qr') {
            try {
                const transferContent = sepayService.generateTransferContent(payment._id)
                const qrCodeUrl = sepayService.generateQRCode(
                    amount,
                    transferContent,
                    process.env.SEPAY_ACCOUNT_NUMBER || '1234567890',
                    process.env.SEPAY_BANK_CODE || 'VCB'
                )

                // Cập nhật payment với thông tin SePay
                payment.sepayInfo = {
                    qrCodeUrl,
                    transferContent,
                    bankCode: process.env.SEPAY_BANK_CODE || 'VCB',
                    accountNumber: process.env.SEPAY_ACCOUNT_NUMBER || '1234567890',
                    accountName: 'CONG TY BAT DONG SAN',
                    webhookReceived: false
                }

                // Mark sepayInfo as modified để Mongoose save
                payment.markModified('sepayInfo')
                await payment.save()

                responseData.sepayInfo = {
                    qrCodeUrl,
                    transferContent,
                    bankName: process.env.SEPAY_BANK_NAME || 'Vietcombank',
                    accountNumber: process.env.SEPAY_ACCOUNT_NUMBER || '1234567890',
                    accountName: 'CONG TY BAT DONG SAN',
                    amount
                }
            } catch (sepayError) {
                console.error('SePay QR generation error:', sepayError)
                console.error('SePay error stack:', sepayError.stack)
                // Fallback to bank transfer if SePay fails
                responseData.bankInfo = {
                    bankName: 'Vietcombank',
                    accountNumber: '1234567890',
                    accountName: 'CONG TY BAT DONG SAN',
                    transferContent: `THANHTOAN ${payment._id}`,
                    amount: amount
                }
            }
        }
        // Nếu là chuyển khoản thông thường
        else if (paymentMethod === 'bank_transfer') {
            responseData.bankInfo = {
                bankName: 'Vietcombank',
                accountNumber: '1234567890',
                accountName: 'CONG TY BAT DONG SAN',
                transferContent: `THANHTOAN ${payment._id}`,
                amount: amount
            }
        }

        res.status(201).json({
            success: true,
            message: 'Tạo đơn thanh toán thành công',
            data: responseData
        })
    } catch (error) {
        console.error('Create payment error:', error)
        console.error('Error stack:', error.stack)
        res.status(500).json({
            success: false,
            message: 'Lỗi tạo đơn thanh toán',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
})

// Upload ảnh chuyển khoản
router.post('/upload-proof/:paymentId', auth, async (req, res) => {
    try {
        const { paymentId } = req.params
        const { transferImage, bankName, accountNumber, transferContent } = req.body

        const payment = await Payment.findById(paymentId)
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn thanh toán'
            })
        }

        // Kiểm tra quyền
        if (payment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền cập nhật đơn thanh toán này'
            })
        }

        // Cập nhật thông tin chuyển khoản
        payment.bankTransferInfo = {
            bankName,
            accountNumber,
            transferContent,
            transferImage
        }
        payment.status = 'pending' // Chờ admin xác nhận
        await payment.save()

        res.json({
            success: true,
            message: 'Upload ảnh chuyển khoản thành công. Vui lòng đợi admin xác nhận.',
            data: payment
        })
    } catch (error) {
        console.error('Upload proof error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi upload ảnh chuyển khoản'
        })
    }
})

// Lấy danh sách thanh toán của user
router.get('/my-payments', auth, async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user._id })
            .populate('property', 'title image price location')
            .sort({ createdAt: -1 })

        res.json({
            success: true,
            data: payments
        })
    } catch (error) {
        console.error('Get my payments error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi lấy danh sách thanh toán'
        })
    }
})

// Lấy chi tiết thanh toán
router.get('/:paymentId', auth, async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.paymentId)
            .populate('property')
            .populate('user', 'name email phone')

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn thanh toán'
            })
        }

        // Kiểm tra quyền
        if (payment.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền xem đơn thanh toán này'
            })
        }

        res.json({
            success: true,
            data: payment
        })
    } catch (error) {
        console.error('Get payment error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi lấy thông tin thanh toán'
        })
    }
})

export default router
