import mongoose from 'mongoose'
import Property from '../models/Property.js'
import User from '../models/User.js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '../.env') })

const approveAllProperties = async () => {
    try {
        console.log('🔄 Đang kết nối MongoDB...')
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ Kết nối MongoDB thành công!')

        // Tìm admin để gán vào approvedBy
        const admin = await User.findOne({ role: 'admin' })

        if (!admin) {
            console.log('⚠️  Không tìm thấy admin. Vẫn tiếp tục duyệt...')
        }

        // Đếm số tin chờ duyệt
        const pendingCount = await Property.countDocuments({
            approvalStatus: 'pending'
        })

        console.log(`\n📊 Tìm thấy ${pendingCount} tin chờ duyệt`)

        if (pendingCount === 0) {
            console.log('✅ Không có tin nào cần duyệt!')
            await mongoose.connection.close()
            process.exit(0)
        }

        // Xác nhận
        console.log('\n⚠️  BẠN SẮP DUYỆT TẤT CẢ TIN ĐĂNG!')
        console.log('   Tất cả tin "Chờ duyệt" sẽ chuyển sang "Đã duyệt"')
        console.log('   Các tin này sẽ hiển thị công khai trên website')
        console.log('\n   Nhấn Ctrl+C để hủy, hoặc đợi 5 giây để tiếp tục...\n')

        // Đợi 5 giây
        await new Promise(resolve => setTimeout(resolve, 5000))

        // Duyệt tất cả tin
        const result = await Property.updateMany(
            { approvalStatus: 'pending' },
            {
                $set: {
                    approvalStatus: 'approved',
                    verified: true,
                    approvedBy: admin?._id,
                    approvedAt: new Date()
                }
            }
        )

        console.log(`✅ Đã duyệt ${result.modifiedCount} tin đăng`)
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log('📋 Trạng thái: approved (Đã duyệt)')
        console.log('✓ Verified: true')
        if (admin) {
            console.log(`👤 Approved by: ${admin.name}`)
        }
        console.log(`📅 Approved at: ${new Date().toLocaleString('vi-VN')}`)
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

        console.log('\n📊 Thống kê sau khi duyệt:')
        stats.forEach(stat => {
            const statusName = {
                'pending': 'Chờ duyệt',
                'approved': 'Đã duyệt',
                'rejected': 'Từ chối'
            }[stat._id] || stat._id
            console.log(`   ${statusName}: ${stat.count}`)
        })

        console.log('\n✅ Hoàn tất!')
        console.log('   - Tất cả tin đã được duyệt')
        console.log('   - Tin đã hiển thị trên trang chủ')
        console.log('\n🔗 Xem trang chủ: http://localhost:3000\n')

        await mongoose.connection.close()
        process.exit(0)
    } catch (error) {
        console.error('❌ Lỗi:', error.message)
        await mongoose.connection.close()
        process.exit(1)
    }
}

approveAllProperties()
