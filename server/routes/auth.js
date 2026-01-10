import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import passport from '../config/passport.js'

const router = express.Router()

// Tạo JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET || 'your-secret-key', {
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
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                role: user.role
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

// Middleware xác thực
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy token'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
        // Fix: decoded.userId not decoded.id
        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.error('Auth error:', error)
        res.status(401).json({
            success: false,
            message: 'Token không hợp lệ'
        })
    }
}

// Lấy thông tin user hiện tại
router.get('/me', auth, async (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                user: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    phone: req.user.phone,
                    avatar: req.user.avatar,
                    role: req.user.role
                }
            }
        })
    } catch (error) {
        console.error('Get user error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
})

// Lấy thông tin profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate('savedProperties')

        res.json(user)
    } catch (error) {
        console.error('Get profile error:', error)
        res.status(500).json({ message: 'Lỗi server' })
    }
})

// Cập nhật profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, phone, avatar } = req.body

        const user = await User.findById(req.user._id)

        if (name) user.name = name
        if (phone !== undefined) user.phone = phone
        if (avatar !== undefined) user.avatar = avatar

        await user.save()

        const updatedUser = await User.findById(user._id).select('-password')
        res.json(updatedUser)
    } catch (error) {
        console.error('Update profile error:', error)
        res.status(500).json({ message: 'Lỗi server' })
    }
})

// Đổi mật khẩu
router.put('/change-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body

        const user = await User.findById(req.user._id)

        // Kiểm tra mật khẩu hiện tại
        const isPasswordValid = await user.comparePassword(currentPassword)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' })
        }

        // Cập nhật mật khẩu mới
        user.password = newPassword
        await user.save()

        res.json({ message: 'Đổi mật khẩu thành công' })
    } catch (error) {
        console.error('Change password error:', error)
        res.status(500).json({ message: 'Lỗi server' })
    }
})

// ============================================
// GOOGLE OAUTH ROUTES
// ============================================

// Khởi tạo Google OAuth
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false
    })
)

// Google OAuth callback
router.get('/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=google_auth_failed`
    }),
    (req, res) => {
        try {
            // Tạo JWT token
            const token = generateToken(req.user._id)

            // Redirect về client với token
            const clientURL = process.env.CLIENT_URL || 'http://localhost:3000'
            res.redirect(`${clientURL}/auth/google/success?token=${token}`)
        } catch (error) {
            console.error('Google callback error:', error)
            res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=token_generation_failed`)
        }
    }
)

// Verify Google token từ client (Alternative method)
router.post('/google/verify', async (req, res) => {
    try {
        const { credential } = req.body

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu Google credential'
            })
        }

        // Verify Google token
        const { OAuth2Client } = await import('google-auth-library')
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        const { sub: googleId, email, name, picture } = payload

        // Tìm hoặc tạo user
        let user = await User.findOne({ googleId })

        if (!user) {
            // Kiểm tra email đã tồn tại chưa
            const existingUser = await User.findOne({ email })

            if (existingUser) {
                // Link Google account với existing user
                existingUser.googleId = googleId
                existingUser.authProvider = 'google'
                existingUser.avatar = picture || existingUser.avatar
                existingUser.isVerified = true
                await existingUser.save()
                user = existingUser
            } else {
                // Tạo user mới
                user = await User.create({
                    googleId,
                    name,
                    email,
                    avatar: picture || '',
                    authProvider: 'google',
                    isVerified: true,
                    password: Math.random().toString(36).slice(-8)
                })
            }
        }

        // Tạo JWT token
        const token = generateToken(user._id)

        res.json({
            success: true,
            message: 'Đăng nhập Google thành công',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                role: user.role,
                authProvider: user.authProvider
            }
        })
    } catch (error) {
        console.error('Google verify error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi xác thực Google'
        })
    }
})

export default router
