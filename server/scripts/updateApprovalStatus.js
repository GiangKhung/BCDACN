import mongoose from 'mongoose'
import Property from '../models/Property.js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '../.env') })

const updateApprovalStatus = async () => {
    try {
        console.log('🔄 Đang kết nối MongoDB...')
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ Kết nối MongoDB thành công!')

        // Đếm số tin chưa có approvalStatus
        const propertiesWithoutStatus = await Property.countDocuments({
            approvalStatus: { $exists: false }
        })

        console.log(`\n📊 Tìm thấy ${propertiesWithoutStatus} tin chưa có trạng thái duyệt`)

        if (propertiesWithoutStatus === 0) {
            console.log('✅ Tất cả tin đã có trạng thái duyệt!')
            await mongoose.connection.close()
            process.exit(0)
        }

        // Cập nhật tất cả tin chưa có approvalStatus
        const result = await Property.updateMany(
            { approvalStatus: { $exists: false } },
            {
                $set: {
                    approvalStatus: 'pending',
                    verified: false
                }
            }
        )

        console.log(`\n✅ Đã cập nhật ${result.modifiedCount} tin đăng`)
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log('📋 Trạng thái: pending (Chờ duyệt)')
        console.log('🔒 Verified: false')
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

        // Hiển thị thống kê
        const stats = await Property.aggregate([
            {
                $group: {
                    _id: '$approvalStatus',
                    count: { $sum: 1 }
                }
            }
        ])

        console.log('\n📊 Thống kê sau khi cập nhật:')
        stats.forEach(stat => {
            const statusName = {
                'pending': 'Chờ duyệt',
                'approved': 'Đã duyệt',
                'rejected': 'Từ chối'
            }[stat._id] || stat._id
            console.log(`   ${statusName}: ${stat.count}`)
        })

        console.log('\n💡 Lưu ý:')
        console.log('   - Tất cả tin cũ đã được chuyển sang trạng thái "Chờ duyệt"')
        console.log('   - Admin cần vào trang quản trị để duyệt các tin này')
        console.log('   - Tin chưa duyệt sẽ KHÔNG hiển thị trên trang chủ')
        console.log('\n🔗 Vào trang admin: http://localhost:3000/admin\n')

        await mongoose.connection.close()
        process.exit(0)
    } catch (error) {
        console.error('❌ Lỗi:', error.message)
        await mongoose.connection.close()
        process.exit(1)
    }
}

updateApprovalStatus()
