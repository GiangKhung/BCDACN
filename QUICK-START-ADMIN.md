# Quick Start - Trang Quản Trị

## 🚀 Bước 1: Fix MongoDB Connection

### Option A: MongoDB Atlas (Khuyến nghị)

1. Vào https://cloud.mongodb.com/
2. Chọn project → Security → Network Access
3. Click "Add IP Address"
4. Chọn "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm" và đợi 1-2 phút

### Option B: MongoDB Local

Sửa file `server/.env`:
```env
# Comment dòng Atlas
# MONGODB_URI=mongodb+srv://admin:VrH88PmVm5xodYYM@clusterbds.pjnkt12.mongodb.net/real-estate-db?retryWrites=true&w=majority&appName=ClusterBDS

# Uncomment dòng local
MONGODB_URI=mongodb://localhost:27017/real-estate-db
```

Sau đó start MongoDB:
```bash
net start MongoDB
```

## 🗄️ Bước 2: Seed Dữ Liệu

Mở terminal trong thư mục `server`:

```bash
cd server

# 1. Seed users (bao gồm admin)
node scripts/seedUsers.js

# 2. Seed properties & projects
node scripts/seedData.js
```

**Kết quả mong đợi:**
```
✅ Tạo user: Admin (admin@batdongsan.com) - Role: admin
✅ Tạo user: Nguyễn Văn An (nguyenvanan@gmail.com) - Role: user
✅ Tạo user: Lê Văn Cường (levancuong@gmail.com) - Role: agent
...
✅ Đã thêm 10 properties cơ bản
✅ Đã thêm 10 properties chi tiết
✅ Đã thêm 10 projects
```

## 🖥️ Bước 3: Start Servers

### Terminal 1 - Server
```bash
cd server
npm run dev
```

Server chạy tại: http://localhost:5000

### Terminal 2 - Client
```bash
cd client
npm run dev
```

Client chạy tại: http://localhost:5173

## 🔐 Bước 4: Đăng Nhập Admin

1. Vào http://localhost:5173/login
2. Nhập thông tin:
   - **Email:** admin@batdongsan.com
   - **Password:** admin123456
3. Click "Đăng nhập"

## 🎛️ Bước 5: Vào Trang Quản Trị

Sau khi đăng nhập:

1. Click vào tên "Admin" ở góc phải header
2. Trong dropdown menu, click "Quản trị" (có icon khiên màu tím)
3. Hoặc truy cập trực tiếp: http://localhost:5173/admin

## 📊 Trang Quản Trị Có Gì?

### Dashboard
- Tổng số người dùng
- Tổng số bất động sản
- Tổng số dự án
- Người dùng hoạt động
- Người dùng mới trong tháng

### Người Dùng
- Xem danh sách tất cả users
- Tìm kiếm theo tên, email, SĐT
- Lọc theo role (User/Agent/Admin)
- Thay đổi quyền user
- Xóa user

### Bất Động Sản
- Xem tất cả tin đăng
- Lọc theo trạng thái (Chờ duyệt/Đã duyệt/Từ chối/Đã bán)
- Duyệt tin đăng
- Từ chối tin đăng
- Xóa tin đăng

### Báo Cáo
- Đang phát triển...

## ❌ Troubleshooting

### Lỗi: "Đang tải..." mãi không load

**Nguyên nhân:** Không kết nối được MongoDB hoặc chưa có dữ liệu

**Giải pháp:**
```bash
# 1. Test connection
cd server
node scripts/testConnection.js

# 2. Nếu OK, seed lại data
node scripts/seedUsers.js
node scripts/seedData.js

# 3. Restart server
npm run dev
```

### Lỗi: "Cannot find module 'auth.js'"

**Đã fix!** File đã được tạo tại `server/middleware/auth.js`

### Lỗi: "Bạn không có quyền truy cập"

**Nguyên nhân:** User không phải admin

**Giải pháp:**
1. Đăng xuất
2. Đăng nhập lại với: admin@batdongsan.com / admin123456

### Không thấy nút "Quản trị"

**Nguyên nhân:** User không phải admin

**Giải pháp:**
- Chỉ admin mới thấy nút này
- Đăng nhập với tài khoản admin

### Lỗi: CORS hoặc Network Error

**Nguyên nhân:** Server chưa chạy hoặc sai port

**Giải pháp:**
```bash
# Kiểm tra server đang chạy
# Mở http://localhost:5000/
# Phải thấy: "API Bất Động Sản đang hoạt động"

# Nếu không, start lại server
cd server
npm run dev
```

## 📝 Tài Khoản Mẫu

### Admin
- Email: admin@batdongsan.com
- Password: admin123456
- Role: admin

### User
- Email: nguyenvanan@gmail.com
- Password: user123456
- Role: user

### Agent
- Email: levancuong@gmail.com
- Password: agent123456
- Role: agent

## 🎯 Checklist

- [ ] MongoDB đã kết nối (test với testConnection.js)
- [ ] Đã seed users (seedUsers.js)
- [ ] Đã seed properties (seedData.js)
- [ ] Server đang chạy (port 5000)
- [ ] Client đang chạy (port 5173)
- [ ] Đã đăng nhập với admin account
- [ ] Thấy nút "Quản trị" trong dropdown
- [ ] Vào được trang /admin
- [ ] Thấy dữ liệu trong Dashboard

## 📞 Cần Hỗ Trợ?

Xem các file hướng dẫn:
- `FIX-MONGODB-TIMEOUT.md` - Fix lỗi MongoDB
- `HUONG-DAN-SEED-DATA.md` - Hướng dẫn seed data
- `HUONG-DAN-ADMIN.md` - Hướng dẫn chi tiết admin panel
- `START-DEV.md` - Hướng dẫn start development

---

**Chúc bạn thành công! 🎉**
