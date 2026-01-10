import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    // Thông tin thanh toán
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Chi tiết thanh toán
    amount: {
        type: Number,
        required: true
    },
    pricePerDay: {
        type: Number,
        default: 50000
    },
    durationDays: {
        type: Number,
        required: true,
        min: 30
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    // Phương thức thanh toán
    paymentMethod: {
        type: String,
        enum: ['bank_transfer', 'sepay_qr', 'momo', 'vnpay', 'cash'],
        required: true
    },
    // Trạng thái
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    // Thông tin giao dịch
    transactionId: {
        type: String
    },
    bankTransferInfo: {
        bankName: String,
        accountNumber: String,
        accountName: String,
        transferContent: String,
        transferImage: String
    },
    // Thông tin SePay QR
    sepayInfo: {
        qrCodeUrl: String,
        transferContent: String,
        bankCode: String,
        accountNumber: String,
        accountName: String,
        webhookReceived: {
            type: Boolean,
            default: false
        },
        webhookData: {
            type: Object
        },
        transactionDate: Date
    },
    // Xác nhận
    confirmedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    confirmedAt: {
        type: Date
    },
    // Ghi chú
    note: {
        type: String
    },
    adminNote: {
        type: String
    }
}, {
    timestamps: true
})

// Index để tìm kiếm nhanh
paymentSchema.index({ property: 1, user: 1 })
paymentSchema.index({ status: 1 })
paymentSchema.index({ createdAt: -1 })

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment
