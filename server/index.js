import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import propertiesRouter from './routes/properties.js'
import projectsRouter from './routes/projects.js'
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'
import paymentRouter from './routes/payment.js'
import adminPaymentRouter from './routes/adminPayment.js'
import removalRequestRouter from './routes/removalRequest.js'
import statisticsRouter from './routes/statistics.js'
import sepayWebhookRouter from './routes/sepayWebhook.js'
import oauthRouter from './routes/oauth.js'
import {
    startExpiredPropertiesCheck,
    startExpirationWarningCheck,
    runExpiredPropertiesCheckNow
} from './jobs/checkExpiredProperties.js'

dotenv.config()

// Kết nối MongoDB
connectDB()

// Khởi động cron jobs
startExpiredPropertiesCheck()
startExpirationWarningCheck()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
// Tăng giới hạn payload để hỗ trợ upload ảnh (50MB)
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Routes
app.use('/api/properties', propertiesRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/admin/payment', adminPaymentRouter)
app.use('/api/removal-request', removalRequestRouter)
app.use('/api/statistics', statisticsRouter)
app.use('/api/sepay', sepayWebhookRouter)
app.use('/oauth', oauthRouter)

app.get('/', (req, res) => {
    res.json({
        message: 'API Bất Động Sản đang hoạt động',
        endpoints: {
            properties: '/api/properties',
            projects: '/api/projects',
            auth: '/api/auth',
            admin: '/api/admin',
            payment: '/api/payment',
            statistics: '/api/statistics'
        }
    })
})

// Admin endpoint để chạy check expired properties ngay lập tức
app.post('/api/admin/check-expired-properties', async (req, res) => {
    try {
        const result = await runExpiredPropertiesCheckNow()
        res.json(result)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi kiểm tra tin đăng hết hạn',
            error: error.message
        })
    }
})

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
    console.log(`📋 API Properties: http://localhost:${PORT}/api/properties`)
    console.log(`🏗️  API Projects: http://localhost:${PORT}/api/projects`)
})
