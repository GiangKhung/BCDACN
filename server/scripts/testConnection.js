import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const testConnection = async () => {
    console.log('🔍 Đang kiểm tra kết nối MongoDB...')
    console.log('📍 URI:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'))

    try {
        // Thử kết nối với timeout ngắn hơn
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000, // 10 giây
            socketTimeoutMS: 45000,
        })

        console.log('✅ Kết nối MongoDB thành công!')
        console.log('📊 Database:', mongoose.connection.name)
        console.log('🌐 Host:', mongoose.connection.host)

        // Liệt kê các collections
        const collections = await mongoose.connection.db.listCollections().toArray()
        console.log('\n📁 Collections hiện có:')
        if (collections.length === 0) {
            console.log('   (Chưa có collection nào - database trống)')
        } else {
            collections.forEach(col => {
                console.log(`   - ${col.name}`)
            })
        }

        // Đếm documents trong mỗi collection
        console.log('\n📈 Số lượng documents:')
        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments()
            console.log(`   - ${col.name}: ${count} documents`)
        }

        await mongoose.connection.close()
        console.log('\n✅ Đóng kết nối thành công!')
        process.exit(0)

    } catch (error) {
        console.error('\n❌ Lỗi kết nối MongoDB:')
        console.error('   Message:', error.message)

        if (error.message.includes('ETIMEOUT') || error.message.includes('querySrv')) {
            console.error('\n💡 Giải pháp:')
            console.error('   1. Kiểm tra IP whitelist trên MongoDB Atlas')
            console.error('   2. Vào MongoDB Atlas → Network Access → Add IP Address')
            console.error('   3. Chọn "Allow Access from Anywhere" (0.0.0.0/0)')
            console.error('   4. Hoặc thêm IP hiện tại của bạn')
            console.error('\n   🔗 Link: https://cloud.mongodb.com/v2/YOUR_PROJECT_ID#/security/network/accessList')
        }

        if (error.message.includes('authentication failed')) {
            console.error('\n💡 Giải pháp:')
            console.error('   1. Kiểm tra username/password trong .env')
            console.error('   2. Đảm bảo password không có ký tự đặc biệt cần encode')
        }

        process.exit(1)
    }
}

testConnection()
