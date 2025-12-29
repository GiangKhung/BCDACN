import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async (req, res, next) => {
    try {
        // Lấy token từ header
        const token = req.header('Authorization')?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để tiếp tục'
            })
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Tìm user
        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Người dùng không tồn tại'
            })
        }

        // Kiểm tra user có bị khóa không (nếu có field isActive)
        if (user.isActive === false) {
            return res.status(403).json({
                success: false,
                message: 'Tài khoản đã bị khóa'
            })
        }

        // Gắn user vào request
        req.user = user
        req.userId = user._id

        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token không hợp lệ'
            })
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token đã hết hạn. Vui lòng đăng nhập lại'
            })
        }

        res.status(500).json({
            success: false,
            message: 'Lỗi xác thực',
            error: error.message
        })
    }
}

export default auth
