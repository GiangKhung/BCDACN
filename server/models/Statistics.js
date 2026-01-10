import mongoose from 'mongoose'

const statisticsSchema = new mongoose.Schema({
    // Thống kê theo ngày
    date: {
        type: Date,
        required: true,
        unique: true
    },
    // Thống kê tin đăng
    properties: {
        total: { type: Number, default: 0 },
        active: { type: Number, default: 0 },
        pending: { type: Number, default: 0 },
        sold: { type: Number, default: 0 },
        rented: { type: Number, default: 0 },
        expired: { type: Number, default: 0 },
        newToday: { type: Number, default: 0 }
    },
    // Thống kê thanh toán
    payments: {
        total: { type: Number, default: 0 },
        completed: { type: Number, default: 0 },
        pending: { type: Number, default: 0 },
        failed: { type: Number, default: 0 },
        revenue: { type: Number, default: 0 }
    },
    // Thống kê người dùng
    users: {
        total: { type: Number, default: 0 },
        newToday: { type: Number, default: 0 },
        active: { type: Number, default: 0 }
    },
    // Thống kê theo loại BĐS
    byPropertyType: [{
        type: String,
        count: Number
    }],
    // Thống kê theo khu vực
    byLocation: [{
        city: String,
        count: Number
    }]
}, {
    timestamps: true
})

// Index
statisticsSchema.index({ date: -1 })

const Statistics = mongoose.model('Statistics', statisticsSchema)

export default Statistics
