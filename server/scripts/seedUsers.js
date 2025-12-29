import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'

dotenv.config()

const sampleUsers = [
    {
        name: 'Admin',
        email: 'admin@batdongsan.com',
        password: 'admin123456',
        phone: '0901234567',
        role: 'admin',
        isActive: true,
        isVerified: true
    },
    {
        name: 'Nguyễn Văn An',
        email: 'nguyenvanan@gmail.com',
        password: 'user123456',
        phone: '0912345678',
        role: 'user',
        isActive: true,
        isVerified: true
    },
    {
        name: 'Trần Thị Bình',
        email: 'tranthibinh@gmail.com',
        password: 'user123456',
        phone: '0923456789',
        role: 'user',
        isActive: true,
        isVerified: true
    },
    {
        name: 'Lê Văn Cường',
        email: 'levancuong@gmail.com',
        password: 'agent123456',
        phone: '0934567890',
        role: 'agent',
        isActive: true,
        isVerified: true
    },
    {
        name: 'Phạm Thị Dung',
        email: 'phamthidung@gmail.com',
        password: 'agent123456',
        phone: '0945678901',
        role: 'agent',
        isActive: true,
        isVerified: true
    },
    {
        name: 'Hoàng Văn Em',
        email: 'hoangvanem@gmail.com',
        password: 'user123456',
        phone: '0956789012',
        role: 'user',
        isActive: true,
        isVerified: false
    }
]

const seedUsers = async () => {
    try {
        console.log('🔍 Đang kết nối MongoDB...')

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        })

        console.log('✅ MongoDB đã kết nối')
        console.log('📊 Database:', mongoose.connection.name)

        // Kiểm tra xem đã có users chưa
        const existingUsers = await User.countDocuments()
        console.log(`\n📈 Số users hiện tại: ${existingUsers}`)

        if (existingUsers > 0) {
            const answer = 'yes' // Auto yes for script
            if (answer !== 'yes') {
                console.log('❌ Hủy seed users')
                process.exit(0)
            }
        }

        console.log('\n🗑️  Đang xóa users cũ...')
        await User.deleteMany({})
        console.log('✅ Đã xóa users cũ')

        console.log('\n📦 Đang thêm users mẫu...')

        for (const userData of sampleUsers) {
            try {
                const user = await User.create(userData)
                console.log(`✅ Tạo user: ${user.name} (${user.email}) - Role: ${user.role}`)
            } catch (error) {
                console.error(`❌ Lỗi tạo user ${userData.email}:`, error.message)
            }
        }

        // Thống kê
        const totalUsers = await User.countDocuments()
        const adminCount = await User.countDocuments({ role: 'admin' })
        const agentCount = await User.countDocuments({ role: 'agent' })
        const userCount = await User.countDocuments({ role: 'user' })

        console.log('\n📊 Thống kê:')
        console.log(`   - Tổng users: ${totalUsers}`)
        console.log(`   - Admin: ${adminCount}`)
        console.log(`   - Agent: ${agentCount}`)
        console.log(`   - User: ${userCount}`)

        console.log('\n🎉 Hoàn thành seed users!')
        console.log('\n📝 Thông tin đăng nhập:')
        console.log('   Admin:')
        console.log('   - Email: admin@batdongsan.com')
        console.log('   - Password: admin123456')
        console.log('\n   User/Agent:')
        console.log('   - Password: user123456 hoặc agent123456')

        process.exit(0)
    } catch (error) {
        console.error('\n❌ Lỗi:', error.message)

        if (error.message.includes('ETIMEOUT') || error.message.includes('querySrv')) {
            console.error('\n💡 Giải pháp:')
            console.error('   1. Kiểm tra IP whitelist trên MongoDB Atlas')
            console.error('   2. Network Access → Add IP Address → 0.0.0.0/0')
            console.error('   3. Hoặc dùng MongoDB local (xem FIX-MONGODB-TIMEOUT.md)')
        }

        process.exit(1)
    }
}

seedUsers()
