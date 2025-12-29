import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import propertiesRouter from './routes/properties.js'
import projectsRouter from './routes/projects.js'
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'

dotenv.config()

// Kết nối MongoDB
connectDB()

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

app.get('/', (req, res) => {
    res.json({
        message: 'API Bất Động Sản đang hoạt động',
        endpoints: {
            properties: '/api/properties',
            projects: '/api/projects',
            auth: '/api/auth',
            admin: '/api/admin'
        }
    })
})

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
    console.log(`📋 API Properties: http://localhost:${PORT}/api/properties`)
    console.log(`🏗️  API Projects: http://localhost:${PORT}/api/projects`)
})
