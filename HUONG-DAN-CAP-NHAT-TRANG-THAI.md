# 🔄 Hướng dẫn cập nhật trạng thái duyệt bài

## ✅ Đã hoàn thành

Đã cập nhật **21 tin đăng** từ database cũ sang trạng thái "Chờ duyệt".

## 📊 Kết quả

```
Trước khi cập nhật:
- Tin không có approvalStatus: 21
- Tin chờ duyệt: 0

Sau khi cập nhật:
- Tin không có approvalStatus: 0
- Tin chờ duyệt: 21 ✅
```

## 🚀 Bước tiếp theo

### 1. Reload trang Admin
- Vào: http://localhost:3000/admin
- Nhấn F5 để reload trang
- Click tab "Bất động sản"
- Click filter "Chờ duyệt"
- Bạn sẽ thấy 21 tin đang chờ duyệt

### 2. Duyệt tin hàng loạt
Có 2 cách:

**Cách 1: Duyệt từng tin**
- Click nút **✓** ở mỗi tin để duyệt
- Hoặc click **✗** để từ chối (nhập lý do)

**Cách 2: Duyệt tất cả (Script)**
```bash
cd server
node scripts/approveAllProperties.js
```

## 📝 Script đã chạy

```bash
cd server
node scripts/updateApprovalStatus.js
```

Script này đã:
1. Tìm tất cả tin không có `approvalStatus`
2. Cập nhật thành `approvalStatus: 'pending'`
3. Đặt `verified: false`

## ⚠️ Lưu ý quan trọng

### Tin chưa duyệt KHÔNG hiển thị công khai
- Trang chủ: Không hiển thị
- Tìm kiếm: Không hiển thị
- API `/api/properties`: Chỉ trả về tin `approved`

### Chỉ Admin mới thấy tin chờ duyệt
- Vào trang Admin: http://localhost:3000/admin
- Tab "Bất động sản" → Filter "Chờ duyệt"

## 🔧 Nếu muốn duyệt tất cả tin cũ

Tạo script duyệt hàng loạt:

```javascript
// server/scripts/approveAllProperties.js
import mongoose from 'mongoose'
import Property from '../models/Property.js'
import dotenv from 'dotenv'

dotenv.config()

const approveAll = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    
    const result = await Property.updateMany(
        { approvalStatus: 'pending' },
        { 
            $set: { 
                approvalStatus: 'approved',
                verified: true,
                approvedAt: new Date()
            } 
        }
    )
    
    console.log(`✅ Đã duyệt ${result.modifiedCount} tin`)
    await mongoose.connection.close()
}

approveAll()
```

Chạy:
```bash
cd server
node scripts/approveAllProperties.js
```

## 📊 Kiểm tra trạng thái

### Trong MongoDB
```javascript
db.properties.aggregate([
  {
    $group: {
      _id: "$approvalStatus",
      count: { $sum: 1 }
    }
  }
])
```

### Qua API
```bash
# Lấy thống kê
curl http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer YOUR_TOKEN"

# Lấy tin chờ duyệt
curl http://localhost:5000/api/admin/properties?approvalStatus=pending \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🎯 Quy trình từ giờ trở đi

### Khi user đăng tin mới:
1. Tin tự động có `approvalStatus: 'pending'`
2. Tin KHÔNG hiển thị công khai
3. Admin nhận thông báo (nếu có)
4. Admin vào trang quản trị để duyệt

### Khi admin duyệt tin:
1. Click nút **✓** (Duyệt)
2. Tin chuyển sang `approvalStatus: 'approved'`
3. Tin hiển thị công khai ngay lập tức
4. User có thể thấy tin của mình trên trang chủ

### Khi admin từ chối tin:
1. Click nút **✗** (Từ chối)
2. Nhập lý do từ chối
3. Tin chuyển sang `approvalStatus: 'rejected'`
4. Tin KHÔNG hiển thị công khai
5. User có thể xem lý do từ chối (nếu implement)

## 🔗 Links hữu ích

- **Trang Admin**: http://localhost:3000/admin
- **Đăng nhập**: http://localhost:3000/login
- **Trang chủ**: http://localhost:3000
- **API Stats**: http://localhost:5000/api/admin/stats

## 📚 Tài liệu liên quan

- `HUONG-DAN-DUYET-BAI.md` - Hướng dẫn chi tiết hệ thống duyệt bài
- `HUONG-DAN-ADMIN.md` - Hướng dẫn sử dụng trang Admin
- `server/scripts/updateApprovalStatus.js` - Script cập nhật trạng thái
