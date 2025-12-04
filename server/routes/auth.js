import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Tạo JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '30d'
    })
}

// Đăng ký
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body

        // Kiểm tra dữ liệu đầu vào
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin'
            })
        }

        // Kiểm tra email đã tồn tại
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email đã được sử dụng'
            })
        }

        // Tạo user mới
        const user = await User.create({
            name,
            email,
            phone,
            password
        })

        // Tạo token
        const token = generateToken(user._id)

        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    avatar: user.avatar,
                    role: user.role
                },
                token
            }
        })
    } catch (error) {
        console.error('Register error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi đăng ký'
        })
    }
})

// Đăng nhập
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Kiểm tra dữ liệu đầu vào
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập email và mật khẩu'
            })
        }

        // Tìm user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            })
        }

        // Kiểm tra password
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            })
        }

        // Tạo token
        const token = generateToken(user._id)

        res.json({
            success: true,
            message: 'Đăng nhập thành công',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    avatar: user.avatar,
                    role: user.role
                },
                token
            }
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi đăng nhập'
        })
    }
})

// Lấy thông tin user hiện tại
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy token'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
        const user = await User.findById(decoded.id).select('-password')

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            })
        }

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    avatar: user.avatar,
                    role: user.role
                }
            }
        })
    } catch (error) {
        console.error('Get user error:', error)
        res.status(401).json({
            success: false,
            message: 'Token không hợp lệ'
        })
    }
})

export default router
