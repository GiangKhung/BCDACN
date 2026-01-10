import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import User from '../models/User.js'

// Load environment variables
dotenv.config()

// Cấu hình Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
            scope: ['profile', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Kiểm tra user đã tồn tại chưa
                let user = await User.findOne({ googleId: profile.id })

                if (user) {
                    // User đã tồn tại, cập nhật thông tin nếu cần
                    if (user.avatar !== profile.photos[0]?.value) {
                        user.avatar = profile.photos[0]?.value || ''
                        await user.save()
                    }
                    return done(null, user)
                }

                // Kiểm tra email đã được sử dụng chưa
                const existingEmailUser = await User.findOne({
                    email: profile.emails[0].value
                })

                if (existingEmailUser) {
                    // Email đã tồn tại với local auth, link với Google
                    existingEmailUser.googleId = profile.id
                    existingEmailUser.authProvider = 'google'
                    existingEmailUser.avatar = profile.photos[0]?.value || existingEmailUser.avatar
                    existingEmailUser.isVerified = true
                    await existingEmailUser.save()
                    return done(null, existingEmailUser)
                }

                // Tạo user mới
                const newUser = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0]?.value || '',
                    authProvider: 'google',
                    isVerified: true,
                    password: Math.random().toString(36).slice(-8) // Random password (không sử dụng)
                })

                done(null, newUser)
            } catch (error) {
                console.error('Google OAuth error:', error)
                done(error, null)
            }
        }
    )
)

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error, null)
    }
})

export default passport
