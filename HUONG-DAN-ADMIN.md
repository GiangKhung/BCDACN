# Hướng Dẫn Hệ Thống Quản Trị (Admin Panel)

## 📋 Tổng Quan

Hệ thống quản trị cho phép Admin quản lý toàn bộ website bất động sản, bao gồm người dùng, bất động sản, và các báo cáo thống kê.

## 🔐 Phân Quyền

### 1. User Roles

**Guest (Khách):**
- Xem bất động sản
- Tìm kiếm
- Xem tin tức

**User (Người dùng):**
- Tất cả quyền Guest
- Đăng tin
- Lưu yêu thích
- Quản lý tin đăng của mình

**Agent (Môi giới):**
- Tất cả quyền User
- Đăng nhiều tin
- Thống kê chi tiết

**Admin (Quản trị viên):**
- Tất cả quyền
- Quản lý người dùng
- Duyệt/Từ chối tin
- Xóa tin đăng
- Xem báo cáo

### 2. Cách Tạo Admin

**Cách 1: Thông qua Database**

```javascript
// Kết nối MongoDB và cập nhật user
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

**Cách 2: Thông qua API (cần quyền admin hiện tại)**

```javascript
PUT /api/admin/users/:userId
{
  "role": "admin"
}
```

**Cách 3: Tạo admin đầu tiên**

Tạo file `server/scripts/createAdmin.js`:

```javascript
import mongoose from 'mongoose'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@batdongsan.com',
      password: 'admin123456',
      role: 'admin',
      isVerified: true
    })
    
    console.log('✅ Tạo admin thành công!')
    console.log('Email:', admin.email)
    console.log('Password: admin123456')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Lỗi:', error)
    process.exit(1)
  }
}

createAdmin()
```

Chạy script:
```bash
cd server
node scripts/createAdmin.js
```

## 🎯 Tính Năng Admin Panel

### 1. Dashboard

**URL:** `/admin`

**Chức năng:**
- Thống kê tổng quan
- Số lượng người dùng
- Số lượng bất động sản
- Số lượng dự án
- Người dùng hoạt động
- Người dùng mới trong tháng

**Hiển thị:**
- 4 stat cards với số liệu
- Biểu đồ hoạt động (đang phát triển)

### 2. Quản Lý Người Dùng

**Chức năng:**
- Xem danh sách tất cả người dùng
- Tìm kiếm theo tên, email, số điện thoại
- Lọc theo role (User/Agent/Admin)
- Thay đổi quyền người dùng
- Xóa người dùng

**Lưu ý:**
- Không thể tự xóa tài khoản của mình
- Không thể tự hạ cấp quyền admin của mình
- Xóa người dùng sẽ xóa tất cả tin đăng của họ

**Thao tác:**

1. **Tìm kiếm người dùng:**
   - Nhập từ khóa vào ô tìm kiếm
   - Chọn role để lọc

2. **Thay đổi quyền:**
   - Click vào dropdown role
   - Chọn quyền mới (User/Agent/Admin)
   - Xác nhận thay đổi

3. **Xóa người dùng:**
   - Click nút 🗑️
   - Xác nhận xóa

### 3. Quản Lý Bất Động Sản

**Chức năng:**
- Xem tất cả bất động sản
- Lọc theo trạng thái
- Duyệt tin đăng
- Từ chối tin đăng
- Xóa tin đăng

**Trạng thái tin đăng:**
- `pending` - Chờ duyệt
- `available` - Đã duyệt
- `rejected` - Đã từ chối
- `sold` - Đã bán

**Thao tác:**

1. **Duyệt tin:**
   - Click nút "✓ Duyệt"
   - Tin sẽ chuyển sang trạng thái "Đã duyệt"
   - Hiển thị công khai trên website

2. **Từ chối tin:**
   - Click nút "✗ Từ chối"
   - Nhập lý do từ chối
   - Tin sẽ chuyển sang trạng thái "Đã từ chối"

3. **Xóa tin:**
   - Click nút "🗑️ Xóa"
   - Xác nhận xóa
   - Tin sẽ bị xóa vĩnh viễn

### 4. Báo Cáo & Thống Kê

**Chức năng (đang phát triển):**
- Thống kê theo thời gian
- Báo cáo người dùng mới
- Báo cáo tin đăng mới
- Phân tích theo loại BĐS
- Phân tích theo trạng thái

## 🔧 API Endpoints

### Dashboard

```
GET /api/admin/stats
```

Response:
```json
{
  "totalUsers": 150,
  "totalProperties": 500,
  "totalProjects": 25,
  "pendingProperties": 10,
  "activeUsers": 120,
  "newUsersThisMonth": 15
}
```

### Quản Lý Người Dùng

**Lấy danh sách:**
```
GET /api/admin/users?page=1&limit=20&search=&role=&status=
```

**Lấy chi tiết:**
```
GET /api/admin/users/:id
```

**Cập nhật:**
```
PUT /api/admin/users/:id
Body: {
  "name": "Tên mới",
  "email": "email@example.com",
  "role": "admin",
  "isActive": true
}
```

**Xóa:**
```
DELETE /api/admin/users/:id
```

### Quản Lý Bất Động Sản

**Lấy danh sách:**
```
GET /api/admin/properties?page=1&limit=20&search=&status=&type=
```

**Duyệt tin:**
```
PUT /api/admin/properties/:id/approve
```

**Từ chối tin:**
```
PUT /api/admin/properties/:id/reject
Body: {
  "reason": "Lý do từ chối"
}
```

**Xóa:**
```
DELETE /api/admin/properties/:id
```

### Báo Cáo

**Thống kê theo thời gian:**
```
GET /api/admin/reports/timeline?startDate=2024-01-01&endDate=2024-12-31
```

## 🎨 Giao Diện

### Layout

```
┌─────────────────────────────────────┐
│  Sidebar  │  Main Content           │
│           │                         │
│  Logo     │  Header                 │
│           │  ├─ Title               │
│  Nav      │  └─ User Info           │
│  ├─ Dash  │                         │
│  ├─ Users │  Content                │
│  ├─ Props │  ├─ Stats Cards         │
│  └─ Rpts  │  ├─ Tables              │
│           │  └─ Charts              │
│  Back     │                         │
└─────────────────────────────────────┘
```

### Color Scheme

- Primary: `#667eea` (Tím)
- Secondary: `#764ba2` (Tím đậm)
- Success: `#10b981` (Xanh lá)
- Danger: `#dc2626` (Đỏ)
- Warning: `#d97706` (Cam)
- Info: `#4f46e5` (Xanh dương)

## 🔒 Bảo Mật

### Middleware

**auth.js** - Xác thực người dùng:
```javascript
// Kiểm tra JWT token
// Gắn user info vào req.user
```

**adminAuth.js** - Kiểm tra quyền admin:
```javascript
// Kiểm tra req.user.role === 'admin'
// Từ chối nếu không phải admin
```

### Sử dụng:

```javascript
// Route cần đăng nhập
router.get('/profile', auth, handler)

// Route cần quyền admin
router.get('/admin/users', auth, adminAuth, handler)
```

## 📝 Workflow

### 1. Đăng Nhập Admin

```
1. Vào /login
2. Nhập email admin (admin@batdongsan.com)
3. Nhập password (admin123456)
4. Đăng nhập thành công
5. Redirect về trang chủ
6. Vào /admin (http://localhost:5173/admin)
```

**Lưu ý quan trọng:**
- Route `/admin` đã được thêm vào `client/src/App.jsx`
- Đảm bảo server đang chạy: `cd server && npm start` (port 5000)
- Đảm bảo client đang chạy: `cd client && npm run dev` (port 5173)
- Phải đăng nhập với tài khoản admin trước khi truy cập /admin

### 2. Duyệt Tin Đăng

```
1. Vào Admin Panel
2. Click "Bất động sản"
3. Lọc "Chờ duyệt"
4. Xem chi tiết tin
5. Click "Duyệt" hoặc "Từ chối"
6. Xác nhận
```

### 3. Quản Lý Người Dùng

```
1. Vào Admin Panel
2. Click "Người dùng"
3. Tìm kiếm/Lọc user
4. Thay đổi quyền hoặc xóa
5. Xác nhận
```

## 🚀 Triển Khai

### Development

```bash
# Start server
cd server
npm run dev

# Start client
cd client
npm run dev
```

### Production

```bash
# Build client
cd client
npm run build

# Start server
cd server
npm start
```

## 🐛 Troubleshooting

### Lỗi: "Bạn không có quyền truy cập"

**Nguyên nhân:** User không phải admin

**Giải pháp:**
1. Kiểm tra role trong database
2. Cập nhật role thành 'admin'
3. Đăng nhập lại

### Lỗi: "Token không hợp lệ"

**Nguyên nhân:** Token hết hạn hoặc không đúng

**Giải pháp:**
1. Đăng xuất
2. Đăng nhập lại
3. Token mới sẽ được tạo

### Lỗi: "Không thể xóa người dùng"

**Nguyên nhân:** Đang cố xóa chính mình

**Giải pháp:**
- Không thể xóa tài khoản admin đang đăng nhập
- Dùng tài khoản admin khác để xóa

## 📊 Thống Kê

### Metrics Quan Trọng

- **DAU** (Daily Active Users) - Người dùng hoạt động hàng ngày
- **MAU** (Monthly Active Users) - Người dùng hoạt động hàng tháng
- **Conversion Rate** - Tỷ lệ chuyển đổi từ xem sang liên hệ
- **Approval Rate** - Tỷ lệ tin được duyệt
- **User Growth** - Tăng trưởng người dùng

## 🔮 Tính Năng Tương Lai

### Ngắn Hạn
- [ ] Biểu đồ thống kê
- [ ] Export báo cáo Excel/PDF
- [ ] Bulk actions (duyệt/xóa nhiều tin)
- [ ] Activity logs
- [ ] Email notifications

### Dài Hạn
- [ ] Advanced analytics
- [ ] AI content moderation
- [ ] Automated approval
- [ ] Multi-admin roles
- [ ] Audit trail

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra console logs
2. Kiểm tra network requests
3. Xem file HUONG-DAN-ADMIN.md
4. Liên hệ dev team

---

**Lưu ý:** Chỉ cấp quyền admin cho người đáng tin cậy. Admin có toàn quyền trên hệ thống!
