import express from 'express'
import Property from '../models/Property.js'
import User from '../models/User.js'
import auth from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'

const router = express.Router()

// Tất cả routes đều cần auth và adminAuth
router.use(auth)
router.use(adminAuth)

// ============ DASHBOARD ============

// Lấy thống kê tổng quan
router.get('/stats', async (req, res) => {
    try {
        const [
            totalUsers,
            totalProperties,
            approvedProperties,
            pendingProperties,
            rejectedProperties,
            activeUsers,
            newUsersThisMonth,
            newPropertiesThisMonth
        ] = await Promise.all([
            User.countDocuments(),
            Property.countDocuments(),
            Property.countDocuments({ approvalStatus: 'approved' }),
            Property.countDocuments({ approvalStatus: 'pending' }),
            Property.countDocuments({ approvalStatus: 'rejected' }),
            User.countDocuments({ isActive: true }),
            User.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            }),
            Property.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            })
        ])

        res.json({
            totalUsers,
            totalProperties,
            approvedProperties,
            pendingProperties,
            rejectedProperties,
            activeUsers,
            newUsersThisMonth,
            newPropertiesThisMonth
        })
    } catch (error) {
        console.error('Get stats error:', error)
        res.status(500).json({ message: 'Lỗi khi lấy thống kê' })
    }
})

// ============ QUẢN LÝ NGƯỜI DÙNG ============

// Lấy danh sách người dùng
router.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 20, search, role, status } = req.query

        const query = {}

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ]
        }

        if (role) {
            query.role = role
        }

        if (status) {
            query.isActive = status === 'active'
        }

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)

        const count = await User.countDocuments(query)

        res.json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        })
    } catch (error) {
        console.error('Get users error:', error)
        res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng' })
    }
})

// Lấy chi tiết người dùng
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' })
        }

        // Lấy thống kê của user
        const propertiesCount = await Property.countDocuments({ userId: user._id })

        res.json({
            ...user.toObject(),
            propertiesCount
        })
    } catch (error) {
        console.error('Get user error:', error)
        res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng' })
    }
})

// Cập nhật thông tin người dùng
router.put('/users/:id', async (req, res) => {
    try {
        const { name, email, phone, role, isActive } = req.body

        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' })
        }

        // Không cho phép tự hạ cấp quyền admin của chính mình
        if (user._id.toString() === req.user.userId && role !== 'admin') {
            return res.status(400).json({
                message: 'Không thể thay đổi quyền admin của chính mình'
            })
        }

        if (name) user.name = name
        if (email) user.email = email
        if (phone) user.phone = phone
        if (role) user.role = role
        if (typeof isActive !== 'undefined') user.isActive = isActive

        await user.save()

        res.json({
            message: 'Cập nhật thành công',
            user: {
                ...user.toObject(),
                password: undefined
            }
        })
    } catch (error) {
        console.error('Update user error:', error)
        res.status(500).json({ message: 'Lỗi khi cập nhật người dùng' })
    }
})

// Xóa người dùng
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' })
        }

        // Không cho phép xóa chính mình
        if (user._id.toString() === req.user.userId) {
            return res.status(400).json({
                message: 'Không thể xóa tài khoản của chính mình'
            })
        }

        // Xóa tất cả tin đăng của user
        await Property.deleteMany({ userId: user._id })

        await user.deleteOne()

        res.json({ message: 'Xóa người dùng thành công' })
    } catch (error) {
        console.error('Delete user error:', error)
        res.status(500).json({ message: 'Lỗi khi xóa người dùng' })
    }
})

// ============ QUẢN LÝ BẤT ĐỘNG SẢN ============

// Lấy danh sách tất cả bất động sản
router.get('/properties', async (req, res) => {
    try {
        const { page = 1, limit = 20, search, approvalStatus, type } = req.query

        const query = {}

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ]
        }

        if (approvalStatus) {
            query.approvalStatus = approvalStatus
        }

        if (type) {
            query.propertyType = type
        }

        const properties = await Property.find(query)
            .populate('userId', 'name email phone')
            .populate('approvedBy', 'name email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)

        const count = await Property.countDocuments(query)

        res.json({
            properties,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count,
            page: parseInt(page),
            pages: Math.ceil(count / limit)
        })
    } catch (error) {
        console.error('Get properties error:', error)
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bất động sản' })
    }
})

// Duyệt tin đăng
router.put('/properties/:id/approve', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)

        if (!property) {
            return res.status(404).json({ message: 'Không tìm thấy bất động sản' })
        }

        property.approvalStatus = 'approved'
        property.verified = true
        property.approvedBy = req.user.userId
        property.approvedAt = new Date()
        property.rejectionReason = undefined

        await property.save()

        res.json({
            message: 'Duyệt tin thành công',
            property
        })
    } catch (error) {
        console.error('Approve property error:', error)
        res.status(500).json({ message: 'Lỗi khi duyệt tin' })
    }
})

// Từ chối tin đăng
router.put('/properties/:id/reject', async (req, res) => {
    try {
        const { reason } = req.body

        if (!reason) {
            return res.status(400).json({ message: 'Vui lòng nhập lý do từ chối' })
        }

        const property = await Property.findById(req.params.id)

        if (!property) {
            return res.status(404).json({ message: 'Không tìm thấy bất động sản' })
        }

        property.approvalStatus = 'rejected'
        property.rejectionReason = reason
        property.verified = false
        property.approvedBy = req.user.userId
        property.approvedAt = new Date()

        await property.save()

        res.json({
            message: 'Từ chối tin thành công',
            property
        })
    } catch (error) {
        console.error('Reject property error:', error)
        res.status(500).json({ message: 'Lỗi khi từ chối tin' })
    }
})

// Xóa bất động sản
router.delete('/properties/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)

        if (!property) {
            return res.status(404).json({ message: 'Không tìm thấy bất động sản' })
        }

        await property.deleteOne()

        res.json({ message: 'Xóa bất động sản thành công' })
    } catch (error) {
        console.error('Delete property error:', error)
        res.status(500).json({ message: 'Lỗi khi xóa bất động sản' })
    }
})

// ============ BÁO CÁO & THỐNG KÊ ============

// Thống kê theo thời gian
router.get('/reports/timeline', async (req, res) => {
    try {
        const { startDate, endDate } = req.query

        const query = {}
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }

        const [
            newUsers,
            newProperties,
            propertyByType,
            propertyByStatus
        ] = await Promise.all([
            User.countDocuments(query),
            Property.countDocuments(query),
            Property.aggregate([
                { $match: query },
                { $group: { _id: '$propertyType', count: { $sum: 1 } } }
            ]),
            Property.aggregate([
                { $match: query },
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ])
        ])

        res.json({
            newUsers,
            newProperties,
            propertyByType,
            propertyByStatus
        })
    } catch (error) {
        console.error('Get timeline report error:', error)
        res.status(500).json({ message: 'Lỗi khi lấy báo cáo' })
    }
})

export default router
