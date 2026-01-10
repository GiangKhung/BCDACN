import cron from 'node-cron'
import Property from '../models/Property.js'

/**
 * Cron job để kiểm tra và deactivate các tin đăng đã hết hạn
 * Chạy mỗi ngày lúc 00:00 (nửa đêm)
 */
export const startExpiredPropertiesCheck = () => {
    // Chạy mỗi ngày lúc 00:00
    cron.schedule('0 0 * * *', async () => {
        try {
            console.log('🔍 [CRON] Bắt đầu kiểm tra tin đăng hết hạn...')

            const now = new Date()

            // Tìm các tin đăng đã hết hạn nhưng vẫn đang active
            const expiredProperties = await Property.find({
                isActive: true,
                'payment.isPaid': true,
                'payment.endDate': { $lt: now }
            })

            if (expiredProperties.length === 0) {
                console.log('✅ [CRON] Không có tin đăng nào hết hạn')
                return
            }

            console.log(`⚠️  [CRON] Tìm thấy ${expiredProperties.length} tin đăng hết hạn`)

            // Deactivate các tin đăng hết hạn
            const result = await Property.updateMany(
                {
                    isActive: true,
                    'payment.isPaid': true,
                    'payment.endDate': { $lt: now }
                },
                {
                    $set: {
                        isActive: false,
                        status: 'pending' // Chuyển về trạng thái pending
                    }
                }
            )

            console.log(`✅ [CRON] Đã deactivate ${result.modifiedCount} tin đăng hết hạn`)

            // Log chi tiết các tin đăng bị deactivate
            expiredProperties.forEach(property => {
                console.log(`   - ${property.title} (ID: ${property._id})`)
                console.log(`     Hết hạn: ${property.payment.endDate.toLocaleString('vi-VN')}`)
            })

        } catch (error) {
            console.error('❌ [CRON] Lỗi khi kiểm tra tin đăng hết hạn:', error)
        }
    })

    console.log('⏰ [CRON] Đã khởi động job kiểm tra tin đăng hết hạn (chạy mỗi ngày lúc 00:00)')
}

/**
 * Cron job để gửi thông báo sắp hết hạn
 * Chạy mỗi ngày lúc 09:00 sáng
 */
export const startExpirationWarningCheck = () => {
    // Chạy mỗi ngày lúc 09:00
    cron.schedule('0 9 * * *', async () => {
        try {
            console.log('🔔 [CRON] Kiểm tra tin đăng sắp hết hạn...')

            const now = new Date()
            const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

            // Tìm các tin đăng sẽ hết hạn trong 3 ngày tới
            const expiringProperties = await Property.find({
                isActive: true,
                'payment.isPaid': true,
                'payment.endDate': {
                    $gte: now,
                    $lte: threeDaysLater
                }
            }).populate('userId', 'name email phone')

            if (expiringProperties.length === 0) {
                console.log('✅ [CRON] Không có tin đăng nào sắp hết hạn')
                return
            }

            console.log(`⚠️  [CRON] Tìm thấy ${expiringProperties.length} tin đăng sắp hết hạn trong 3 ngày`)

            // TODO: Gửi email/SMS thông báo cho người dùng
            // Hiện tại chỉ log ra console
            expiringProperties.forEach(property => {
                const daysLeft = Math.ceil((property.payment.endDate - now) / (1000 * 60 * 60 * 24))
                console.log(`   - ${property.title}`)
                console.log(`     User: ${property.userId?.name} (${property.userId?.phone})`)
                console.log(`     Còn ${daysLeft} ngày (hết hạn: ${property.payment.endDate.toLocaleString('vi-VN')})`)
            })

        } catch (error) {
            console.error('❌ [CRON] Lỗi khi kiểm tra tin đăng sắp hết hạn:', error)
        }
    })

    console.log('⏰ [CRON] Đã khởi động job thông báo sắp hết hạn (chạy mỗi ngày lúc 09:00)')
}

/**
 * Hàm chạy ngay lập tức để test (không cần đợi đến scheduled time)
 */
export const runExpiredPropertiesCheckNow = async () => {
    try {
        console.log('🔍 [MANUAL] Chạy kiểm tra tin đăng hết hạn ngay...')

        const now = new Date()

        const expiredProperties = await Property.find({
            isActive: true,
            'payment.isPaid': true,
            'payment.endDate': { $lt: now }
        })

        if (expiredProperties.length === 0) {
            console.log('✅ [MANUAL] Không có tin đăng nào hết hạn')
            return { success: true, count: 0 }
        }

        console.log(`⚠️  [MANUAL] Tìm thấy ${expiredProperties.length} tin đăng hết hạn`)

        const result = await Property.updateMany(
            {
                isActive: true,
                'payment.isPaid': true,
                'payment.endDate': { $lt: now }
            },
            {
                $set: {
                    isActive: false,
                    status: 'pending'
                }
            }
        )

        console.log(`✅ [MANUAL] Đã deactivate ${result.modifiedCount} tin đăng hết hạn`)

        return {
            success: true,
            count: result.modifiedCount,
            properties: expiredProperties.map(p => ({
                id: p._id,
                title: p.title,
                endDate: p.payment.endDate
            }))
        }

    } catch (error) {
        console.error('❌ [MANUAL] Lỗi khi kiểm tra tin đăng hết hạn:', error)
        return { success: false, error: error.message }
    }
}
