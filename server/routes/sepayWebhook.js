import express from 'express'
import Payment from '../models/Payment.js'
import Property from '../models/Property.js'
import sepayService from '../services/sepayService.js'

const router = express.Router()

/**
 * Webhook endpoint để nhận thông báo từ SePay
 * POST /api/sepay/webhook
 */
router.post('/webhook', async (req, res) => {
    try {
        console.log('📨 Received SePay webhook:', JSON.stringify(req.body, null, 2))
        console.log('📨 Headers:', JSON.stringify(req.headers, null, 2))

        const webhookData = req.body

        // Xác thực API Key từ header
        const authHeader = req.headers['authorization']
        if (authHeader) {
            // Format: "Apikey YOUR_API_KEY"
            const apiKey = authHeader.replace('Apikey ', '').replace('ApiKey ', '')

            if (apiKey !== process.env.SEPAY_WEBHOOK_SECRET) {
                console.error('❌ Invalid API Key')
                console.error('Received:', apiKey)
                console.error('Expected:', process.env.SEPAY_WEBHOOK_SECRET)
                return res.status(401).json({
                    success: false,
                    message: 'Invalid API Key'
                })
            }
            console.log('✅ API Key verified')
        }

        // Xác thực webhook signature (nếu có)
        const signature = req.headers['x-sepay-signature']
        if (signature && !sepayService.verifyWebhook(webhookData, signature)) {
            console.error('❌ Invalid webhook signature')
            return res.status(401).json({
                success: false,
                message: 'Invalid signature'
            })
        }

        // Parse webhook data
        const parsedData = sepayService.parseWebhookData(webhookData)

        if (!parsedData || !parsedData.paymentId) {
            console.log('⚠️ No payment ID found in webhook data')
            return res.status(200).json({
                success: true,
                message: 'Webhook received but no payment ID found'
            })
        }

        console.log('🔍 Looking for payment:', parsedData.paymentId)

        // Tìm payment
        const payment = await Payment.findById(parsedData.paymentId)

        if (!payment) {
            console.error('❌ Payment not found:', parsedData.paymentId)
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            })
        }

        // Kiểm tra payment đã được xác nhận chưa
        if (payment.status === 'completed') {
            console.log('ℹ️ Payment already completed:', parsedData.paymentId)
            return res.status(200).json({
                success: true,
                message: 'Payment already completed'
            })
        }

        // Kiểm tra số tiền
        if (parsedData.amountIn < payment.amount) {
            console.error('❌ Amount mismatch. Expected:', payment.amount, 'Received:', parsedData.amountIn)

            // Cập nhật note
            payment.adminNote = `Số tiền không khớp. Cần: ${payment.amount} VNĐ, Nhận: ${parsedData.amountIn} VNĐ`
            payment.sepayInfo = {
                ...payment.sepayInfo,
                webhookReceived: true,
                webhookData: parsedData
            }
            await payment.save()

            return res.status(400).json({
                success: false,
                message: 'Amount mismatch'
            })
        }

        console.log('✅ Payment verified, updating...')

        // Cập nhật payment
        payment.status = 'completed'
        payment.transactionId = parsedData.transactionId
        payment.confirmedAt = new Date()
        payment.sepayInfo = {
            ...payment.sepayInfo,
            webhookReceived: true,
            webhookData: parsedData,
            transactionDate: parsedData.transactionDate
        }
        await payment.save()

        // Cập nhật property
        const property = await Property.findById(payment.property)
        if (property) {
            property.payment = {
                isPaid: true,
                amount: payment.amount,
                pricePerDay: payment.pricePerDay,
                durationDays: payment.durationDays,
                startDate: payment.startDate,
                endDate: payment.endDate,
                paymentMethod: payment.paymentMethod,
                paymentStatus: 'completed',
                paidAt: new Date()
            }
            property.isActive = true
            property.expiresAt = payment.endDate
            await property.save()

            console.log('✅ Property activated:', property._id)
        }

        console.log('🎉 Payment completed successfully:', parsedData.paymentId)

        res.status(200).json({
            success: true,
            message: 'Payment confirmed successfully',
            data: {
                paymentId: payment._id,
                transactionId: parsedData.transactionId,
                amount: parsedData.amountIn
            }
        })
    } catch (error) {
        console.error('❌ Webhook processing error:', error)
        res.status(500).json({
            success: false,
            message: 'Webhook processing error',
            error: error.message
        })
    }
})

/**
 * Test webhook endpoint
 * POST /api/sepay/test-webhook
 */
router.post('/test-webhook', async (req, res) => {
    try {
        const { paymentId, amount } = req.body

        if (!paymentId || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Missing paymentId or amount'
            })
        }

        // Tạo mock webhook data
        const mockWebhookData = {
            id: 'TEST_' + Date.now(),
            gateway: 'VCB',
            transaction_date: new Date().toISOString(),
            account_number: '1234567890',
            sub_account: null,
            amount_in: amount,
            amount_out: 0,
            accumulated: amount,
            code: 'TEST',
            transaction_content: `THANHTOAN ${paymentId}`,
            reference_number: 'REF' + Date.now(),
            body: 'Test transaction'
        }

        // Gọi webhook handler
        req.body = mockWebhookData

        const parsedData = sepayService.parseWebhookData(mockWebhookData)
        const payment = await Payment.findById(paymentId)

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            })
        }

        // Cập nhật payment
        payment.status = 'completed'
        payment.transactionId = parsedData.transactionId
        payment.confirmedAt = new Date()
        payment.sepayInfo = {
            ...payment.sepayInfo,
            webhookReceived: true,
            webhookData: parsedData,
            transactionDate: new Date()
        }
        await payment.save()

        // Cập nhật property
        const property = await Property.findById(payment.property)
        if (property) {
            property.payment = {
                isPaid: true,
                amount: payment.amount,
                pricePerDay: payment.pricePerDay,
                durationDays: payment.durationDays,
                startDate: payment.startDate,
                endDate: payment.endDate,
                paymentMethod: payment.paymentMethod,
                paymentStatus: 'completed',
                paidAt: new Date()
            }
            property.isActive = true
            property.expiresAt = payment.endDate
            await property.save()
        }

        res.json({
            success: true,
            message: 'Test webhook processed successfully',
            data: {
                payment,
                property
            }
        })
    } catch (error) {
        console.error('Test webhook error:', error)
        res.status(500).json({
            success: false,
            message: 'Test webhook error',
            error: error.message
        })
    }
})

/**
 * Kiểm tra trạng thái thanh toán
 * GET /api/sepay/check-payment/:paymentId
 */
router.get('/check-payment/:paymentId', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.paymentId)
            .populate('property', 'title')

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            })
        }

        res.json({
            success: true,
            data: {
                paymentId: payment._id,
                status: payment.status,
                amount: payment.amount,
                webhookReceived: payment.sepayInfo?.webhookReceived || false,
                transactionId: payment.transactionId,
                confirmedAt: payment.confirmedAt,
                property: payment.property
            }
        })
    } catch (error) {
        console.error('Check payment error:', error)
        res.status(500).json({
            success: false,
            message: 'Check payment error'
        })
    }
})

export default router
