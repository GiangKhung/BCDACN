import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import propertiesRouter from './routes/properties.js'
import projectsRouter from './routes/projects.js'

dotenv.config()

// Kết nối MongoDB
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/properties', propertiesRouter)
app.use('/api/projects', projectsRouter)

app.get('/', (req, res) => {
    res.json({
        message: 'API Bất Động Sản đang hoạt động',
        endpoints: {
            properties: '/api/properties',
            projects: '/api/projects'
        }
    })
})

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
    console.log(`📋 API Properties: http://localhost:${PORT}/api/properties`)
    console.log(`🏗️  API Projects: http://localhost:${PORT}/api/projects`)
})
