import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Middleware xác thực
export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy token xác thực'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            })
        }

        req.user = user
        req.token = token
        next()
    } catch (error) {
        console.error('Auth error:', error)
        res.status(401).json({
            success: false,
            message: 'Token không hợp lệ hoặc đã hết hạn'
        })
    }
}

// Middleware kiểm tra admin
export const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Bạn không có quyền truy cập'
        })
    }
    next()
}
