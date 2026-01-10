import express from 'express'
import Property from '../models/Property.js'
import Payment from '../models/Payment.js'
import User from '../models/User.js'
import Statistics from '../models/Statistics.js'
import { auth, adminAuth } from '../middleware/auth.js'

const router = express.Router()

// Lấy thống kê tổng quan
router.get('/overview', auth, adminAuth, async (req, res) => {
    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        // Thống kê tin đăng
        const totalProperties = await Property.countDocuments()
        const activeProperties = await Property.countDocuments({ isActive: true })
        const pendingProperties = await Property.countDocuments({
            'payment.paymentStatus': 'pending'
        })
        const soldProperties = await Property.countDocuments({ status: 'sold' })
        const newPropertiesToday = await Property.countDocuments({
            createdAt: { $gte: today }
        })

        // Thống kê thanh toán
        const totalPayments = await Payment.countDocuments()
        const completedPayments = await Payment.countDocuments({ status: 'completed' })
        const pendingPayments = await Payment.countDocuments({ status: 'pending' })

        const revenueResult = await Payment.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ])
        const totalRevenue = revenueResult[0]?.total || 0

        const todayRevenueResult = await Payment.aggregate([
            {
                $match: {
                    status: 'completed',
                    confirmedAt: { $gte: today }
                }
            },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ])
        const todayRevenue = todayRevenueResult[0]?.total || 0

        // Thống kê người dùng
        const totalUsers = await User.countDocuments()
        const newUsersToday = await User.countDocuments({
            createdAt: { $gte: today }
        })

        // Thống kê yêu cầu gỡ tin
        const pendingRemovalRequests = await Property.countDocuments({
            'removalRequest.isRequested': true,
            'removalRequest.status': 'pending'
        })

        res.json({
            success: true,
            data: {
                properties: {
                    total: totalProperties,
                    active: activeProperties,
                    pending: pendingProperties,
                    sold: soldProperties,
                    newToday: newPropertiesToday
                },
                payments: {
                    total: totalPayments,
                    completed: completedPayments,
                    pending: pendingPayments,
                    revenue: totalRevenue,
                    todayRevenue: todayRevenue
                },
                users: {
                    total: totalUsers,
                    newToday: newUsersToday
                },
                removalRequests: {
                    pending: pendingRemovalRequests
                }
            }
        })
    } catch (error) {
        console.error('Get overview statistics error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi lấy thống kê'
        })
    }
})

// Thống kê theo loại BĐS
router.get('/by-property-type', auth, adminAuth, async (req, res) => {
    try {
        const stats = await Property.aggregate([
            {
                $group: {
                    _id: '$propertyType',
                    count: { $sum: 1 },
                    active: {
                        $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
                    }
                }
            },
            { $sort: { count: -1 } }
        ])

        res.json({
            success: true,
            data: stats
        })
    } catch (error) {
        console.error('Get property type statistics error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi lấy thống kê theo loại BĐS'
        })
    }
})

// Thống kê theo khu vực
router.get('/by-location', auth, adminAuth, async (req, res) => {
    try {
        const stats = await Property.aggregate([
            {
                $group: {
                    _id: '$address.city',
                    count: { $sum: 1 },
                    active: {
                        $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
                    }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ])

        res.json({
            success: true,
            data: stats
        })
    } catch (error) {
        console.error('Get location statistics error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi lấy thống kê theo khu vực'
        })
    }
})

// Thống kê doanh thu theo tháng
router.get('/revenue-by-month', auth, adminAuth, async (req, res) => {
    try {
        const { year = new Date().getFullYear() } = req.query

        const stats = await Payment.aggregate([
            {
                $match: {
                    status: 'completed',
                    confirmedAt: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$confirmedAt' },
                    revenue: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ])

        // Fill missing months with 0
        const monthlyData = Array.from({ length: 12 }, (_, i) => {
            const monthData = stats.find(s => s._id === i + 1)
            return {
                month: i + 1,
                revenue: monthData?.revenue || 0,
                count: monthData?.count || 0
            }
        })

        res.json({
            success: true,
            data: monthlyData
        })
    } catch (error) {
        console.error('Get revenue by month error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi lấy thống kê doanh thu'
        })
    }
})

// Thống kê tin đăng mới theo ngày (7 ngày gần nhất)
router.get('/new-properties-trend', auth, adminAuth, async (req, res) => {
    try {
        const days = 7
        const stats = []

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date()
            date.setDate(date.getDate() - i)
            date.setHours(0, 0, 0, 0)

            const nextDate = new Date(date)
            nextDate.setDate(nextDate.getDate() + 1)

            const count = await Property.countDocuments({
                createdAt: {
                    $gte: date,
                    $lt: nextDate
                }
            })

            stats.push({
                date: date.toISOString().split('T')[0],
                count
            })
        }

        res.json({
            success: true,
            data: stats
        })
    } catch (error) {
        console.error('Get new properties trend error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi lấy xu hướng tin đăng'
        })
    }
})

// Top users (người đăng nhiều tin nhất)
router.get('/top-users', auth, adminAuth, async (req, res) => {
    try {
        const { limit = 10 } = req.query

        const stats = await Property.aggregate([
            {
                $group: {
                    _id: '$userId',
                    totalProperties: { $sum: 1 },
                    activeProperties: {
                        $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
                    }
                }
            },
            { $sort: { totalProperties: -1 } },
            { $limit: parseInt(limit) },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $project: {
                    _id: 1,
                    totalProperties: 1,
                    activeProperties: 1,
                    'user.name': 1,
                    'user.email': 1,
                    'user.phone': 1
                }
            }
        ])

        res.json({
            success: true,
            data: stats
        })
    } catch (error) {
        console.error('Get top users error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi lấy thống kê người dùng'
        })
    }
})

export default router
