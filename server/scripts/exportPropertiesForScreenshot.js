const mongoose = require('mongoose');
const Property = require('../models/Property');
require('dotenv').config({ path: '../.env' });

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Đã kết nối MongoDB'))
    .catch(err => console.error('❌ Lỗi kết nối:', err));

async function exportProperties() {
    try {
        console.log('\n🏠 DANH SÁCH BẤT ĐỘNG SẢN TRONG HỆ THỐNG\n');
        console.log('='.repeat(120));

        const properties = await Property.find()
            .populate('owner', 'name email phone')
            .lean();

        console.log(`\nTổng số bất động sản: ${properties.length}\n`);

        // Hiển thị 5 bất động sản đầu tiên
        properties.slice(0, 5).forEach((property, index) => {
            console.log(`\n🏠 BẤT ĐỘNG SẢN #${index + 1}`);
            console.log('-'.repeat(120));
            console.log(`ID:           ${property._id}`);
            console.log(`Tiêu đề:      ${property.title}`);
            console.log(`Loại:         ${property.type}`);
            console.log(`Giao dịch:    ${property.transaction}`);
            console.log(`Giá:          ${property.price.toLocaleString('vi-VN')} VNĐ`);
            console.log(`Diện tích:    ${property.area} m²`);
            console.log(`Phòng ngủ:    ${property.bedrooms || 'N/A'}`);
            console.log(`Phòng tắm:    ${property.bathrooms || 'N/A'}`);
            console.log(`Địa chỉ:      ${property.address}`);
            console.log(`Quận:         ${property.district}`);
            console.log(`Thành phố:    ${property.city}`);
            console.log(`Trạng thái:   ${property.status === 'approved' ? '✅ Đã duyệt' : property.status === 'pending' ? '⏳ Chờ duyệt' : '❌ Từ chối'}`);
            console.log(`Người đăng:   ${property.owner?.name || 'N/A'} (${property.owner?.email || 'N/A'})`);
            console.log(`Số hình ảnh:  ${property.images?.length || 0}`);
            console.log(`Ngày đăng:    ${new Date(property.createdAt).toLocaleString('vi-VN')}`);
            console.log('-'.repeat(120));
        });

        console.log('\n📈 THỐNG KÊ');
        console.log('='.repeat(120));
        const approvedCount = properties.filter(p => p.status === 'approved').length;
        const pendingCount = properties.filter(p => p.status === 'pending').length;
        const rejectedCount = properties.filter(p => p.status === 'rejected').length;
        const saleCount = properties.filter(p => p.transaction === 'Bán').length;
        const rentCount = properties.filter(p => p.transaction === 'Cho thuê').length;

        console.log(`Tổng số:      ${properties.length} bất động sản`);
        console.log(`Đã duyệt:     ${approvedCount} tin`);
        console.log(`Chờ duyệt:    ${pendingCount} tin`);
        console.log(`Từ chối:      ${rejectedCount} tin`);
        console.log(`Bán:          ${saleCount} tin`);
        console.log(`Cho thuê:     ${rentCount} tin`);
        console.log('='.repeat(120));

        // Thống kê theo loại
        console.log('\n📊 THỐNG KÊ THEO LOẠI');
        console.log('='.repeat(120));
        const typeStats = {};
        properties.forEach(p => {
            typeStats[p.type] = (typeStats[p.type] || 0) + 1;
        });
        Object.entries(typeStats).forEach(([type, count]) => {
            console.log(`${type.padEnd(20)} ${count} tin`);
        });
        console.log('='.repeat(120));

    } catch (error) {
        console.error('❌ Lỗi:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n✅ Đã đóng kết nối MongoDB');
    }
}

exportProperties();
