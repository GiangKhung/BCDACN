const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: '../.env' });

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Đã kết nối MongoDB'))
    .catch(err => console.error('❌ Lỗi kết nối:', err));

async function exportUsers() {
    try {
        console.log('\n📊 DANH SÁCH NGƯỜI DÙNG TRONG HỆ THỐNG\n');
        console.log('='.repeat(100));

        const users = await User.find().select('-password').lean();

        console.log(`\nTổng số người dùng: ${users.length}\n`);

        users.forEach((user, index) => {
            console.log(`\n👤 NGƯỜI DÙNG #${index + 1}`);
            console.log('-'.repeat(100));
            console.log(`ID:           ${user._id}`);
            console.log(`Họ tên:       ${user.name}`);
            console.log(`Email:        ${user.email}`);
            console.log(`Số điện thoại: ${user.phone || 'Chưa cập nhật'}`);
            console.log(`Vai trò:      ${user.role === 'admin' ? '👑 Admin' : '👤 User'}`);
            console.log(`Trạng thái:   ${user.isVerified ? '✅ Đã xác thực' : '⏳ Chưa xác thực'}`);
            console.log(`Ngày tạo:     ${new Date(user.createdAt).toLocaleString('vi-VN')}`);
            console.log(`Cập nhật:     ${new Date(user.updatedAt).toLocaleString('vi-VN')}`);
            console.log('-'.repeat(100));
        });

        console.log('\n📈 THỐNG KÊ');
        console.log('='.repeat(100));
        const adminCount = users.filter(u => u.role === 'admin').length;
        const userCount = users.filter(u => u.role === 'user').length;
        const verifiedCount = users.filter(u => u.isVerified).length;

        console.log(`Tổng số:      ${users.length} người dùng`);
        console.log(`Admin:        ${adminCount} người`);
        console.log(`User thường:  ${userCount} người`);
        console.log(`Đã xác thực:  ${verifiedCount} người`);
        console.log(`Chưa xác thực: ${users.length - verifiedCount} người`);
        console.log('='.repeat(100));

    } catch (error) {
        console.error('❌ Lỗi:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n✅ Đã đóng kết nối MongoDB');
    }
}

exportUsers();
