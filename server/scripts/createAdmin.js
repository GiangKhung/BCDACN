import mongoose from 'mongoose'
import User from '../models/User.js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load env từ thư mục server
dotenv.config({ path: join(__dirname, '../.env') })

const createAdmin = async () => {
    try {
        console.log('🔄 Đang kết nối MongoDB...')
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ Kết nối MongoDB thành công!')

        // Kiểm tra xem đã có admin chưa
        const existingAdmin = await User.findOne({ email: 'admin@batdongsan.com' })

        if (existingAdmin) {
            console.log('⚠️  Admin đã tồn tại!')
            console.log('Email:', existingAdmin.email)
            console.log('Role:', existingAdmin.role)

            // Cập nhật role nếu chưa phải admin
            if (existingAdmin.role !== 'admin') {
                existingAdmin.role = 'admin'
                await existingAdmin.save()
                console.log('✅ Đã cập nhật role thành admin!')
            }

            await mongoose.connection.close()
            process.exit(0)
        }

        // Tạo admin mới
        const admin = await User.create({
            name: 'Administrator',
            email: 'admin@batdongsan.com',
            password: 'admin123456',
            phone: '0123456789',
            role: 'admin',
            isVerified: true
        })

        console.log('\n✅ Tạo tài khoản Admin thành công!')
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log('📧 Email:    admin@batdongsan.com')
        console.log('🔑 Password: admin123456')
        console.log('👤 Role:     admin')
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log('\n⚠️  LƯU Ý: Hãy đổi mật khẩu sau khi đăng nhập lần đầu!')
        console.log('\n🚀 Bạn có thể đăng nhập tại: http://localhost:5173/login')
        console.log('📊 Truy cập Admin Panel: http://localhost:5173/admin\n')

        await mongoose.connection.close()
        process.exit(0)
    } catch (error) {
        console.error('❌ Lỗi:', error.message)
        await mongoose.connection.close()
        process.exit(1)
    }
}

createAdmin()
