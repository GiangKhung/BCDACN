import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Property from '../models/Property.js'
import Project from '../models/Project.js'
import { properties } from '../data/properties.js'
import { detailedProperties } from '../data/detailedProperties.js'
import { projects } from '../data/projects.js'

dotenv.config()

const seedData = async () => {
    try {
        console.log('🔍 Đang kết nối MongoDB...')
        console.log('📍 URI:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'))

        // Mongoose 8 với timeout settings
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000, // 10 giây
            socketTimeoutMS: 45000,
        })
        console.log('✅ MongoDB đã kết nối')
        console.log('📊 Database:', mongoose.connection.name)

        // Xóa dữ liệu cũ
        console.log('\n🗑️  Đang xóa dữ liệu cũ...')
        await Property.deleteMany({})
        await Project.deleteMany({})
        console.log('✅ Đã xóa dữ liệu cũ')

        // Thêm dữ liệu Properties
        console.log('\n📦 Đang thêm dữ liệu Properties...')
        await Property.insertMany(properties)
        console.log(`✅ Đã thêm ${properties.length} properties cơ bản`)

        await Property.insertMany(detailedProperties)
        console.log(`✅ Đã thêm ${detailedProperties.length} properties chi tiết`)

        // Thêm dữ liệu Projects
        console.log('\n🏗️  Đang thêm dữ liệu Projects...')
        await Project.insertMany(projects)
        console.log(`✅ Đã thêm ${projects.length} projects`)

        // Thống kê
        const totalProperties = await Property.countDocuments()
        const totalProjects = await Project.countDocuments()

        console.log('\n📊 Thống kê:')
        console.log(`   - Tổng Properties: ${totalProperties}`)
        console.log(`   - Tổng Projects: ${totalProjects}`)

        console.log('\n🎉 Hoàn thành seed dữ liệu!')
        process.exit()
    } catch (error) {
        console.error('\n❌ Lỗi:', error.message)

        if (error.message.includes('ETIMEOUT') || error.message.includes('querySrv')) {
            console.error('\n💡 Giải pháp:')
            console.error('   1. Kiểm tra IP whitelist trên MongoDB Atlas')
            console.error('   2. Network Access → Add IP Address → 0.0.0.0/0')
            console.error('   3. Hoặc dùng MongoDB local (xem FIX-MONGODB-TIMEOUT.md)')
            console.error('\n   📖 Chi tiết: FIX-MONGODB-TIMEOUT.md')
        }

        process.exit(1)
    }
}

seedData()
