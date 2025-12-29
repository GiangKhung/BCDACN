# Hướng Dẫn Seed Dữ Liệu MongoDB

## 🎯 Mục Đích

Thêm dữ liệu mẫu vào MongoDB để test website.

## 📋 Các Bước

### Bước 1: Fix Lỗi Kết Nối MongoDB

**Vấn đề:** Lỗi timeout khi kết nối MongoDB Atlas

**Giải pháp nhanh:**

**Option A - Whitelist IP trên MongoDB Atlas:**
```
1. Vào https://cloud.mongodb.com/
2. Chọn project → Security → Network Access
3. Click "Add IP Address"
4. Chọn "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"
6. Đợi 1-2 phút
```

**Option B - Dùng MongoDB Local:**
```env
# File: server/.env
# Comment dòng MongoDB Atlas:
# MONGODB_URI=mongodb+srv://admin:VrH88PmVm5xodYYM@clusterbds.pjnkt12.mongodb.net/real-estate-db?retryWrites=true&w=majority&appName=ClusterBDS

# Uncomment dòng MongoDB Local:
MONGODB_URI=mongodb://localhost:27017/real-estate-db
```

Sau đó cài và start MongoDB:
```bash
# Download: https://www.mongodb.com/try/download/community
# Sau khi cài:
net start MongoDB
```

### Bước 2: Test Kết Nối

```bash
cd server
node scripts/testConnection.js
```

**Kết quả mong đợi:**
```
✅ Kết nối MongoDB thành công!
📊 Database: real-estate-db
```

### Bước 3: Tạo Tài Khoản Admin

```bash
node scripts/createAdmin.js
```

**Kết quả:**
```
✅ Tạo admin thành công!
Email: admin@batdongsan.com
Password: admin123456
```

### Bước 4: Seed Dữ Liệu

```bash
node scripts/seedData.js
```

**Kết quả mong đợi:**
```
✅ MongoDB đã kết nối
✅ Đã xóa dữ liệu cũ
✅ Đã thêm 10 properties cơ bản
✅ Đã thêm 10 properties chi tiết
✅ Đã thêm 10 projects

📊 Thống kê:
   - Tổng Properties: 20
   - Tổng Projects: 10
```

### Bước 5: Kiểm Tra Dữ Liệu

```bash
node scripts/testConnection.js
```

**Kết quả:**
```
📁 Collections hiện có:
   - users
   - properties
   - projects

📈 Số lượng documents:
   - users: 1 documents
   - properties: 20 documents
   - projects: 10 documents
```

## 🚀 Start Server

```bash
# Terminal 1 - Server
cd server
npm start

# Terminal 2 - Client
cd client
npm run dev
```

## 🧪 Test Website

1. **Trang chủ:** http://localhost:5173/
2. **Đăng nhập:** http://localhost:5173/login
   - Email: admin@batdongsan.com
   - Password: admin123456
3. **Admin panel:** http://localhost:5173/admin
4. **Bất động sản:** http://localhost:5173/for-sale
5. **Dự án:** http://localhost:5173/projects

## 📊 Dữ Liệu Mẫu

### Properties (20 items)
- 10 properties cơ bản (từ `properties.js`)
- 10 properties chi tiết (từ `detailedProperties.js`)
- Bao gồm: Nhà, Căn hộ, Đất, Biệt thự
- Trạng thái: available, pending, sold

### Projects (10 items)
- Các dự án bất động sản lớn
- Có masterplan, tiện ích, vị trí
- Giá từ vài tỷ đến hàng trăm tỷ

### Users (1 admin)
- Email: admin@batdongsan.com
- Password: admin123456
- Role: admin

## ❌ Troubleshooting

### Lỗi: "ETIMEOUT"

**Nguyên nhân:** Không kết nối được MongoDB Atlas

**Giải pháp:**
1. Whitelist IP (xem Bước 1 - Option A)
2. Hoặc dùng MongoDB local (xem Bước 1 - Option B)
3. Chi tiết: `FIX-MONGODB-TIMEOUT.md`

### Lỗi: "Cannot find module"

**Nguyên nhân:** Thiếu dependencies

**Giải pháp:**
```bash
cd server
npm install
```

### Lỗi: "Duplicate key error"

**Nguyên nhân:** Dữ liệu đã tồn tại

**Giải pháp:**
```bash
# Xóa database và seed lại
node scripts/seedData.js
```

### Không có dữ liệu trên website

**Kiểm tra:**
1. Server đang chạy? (port 5000)
2. Client đang chạy? (port 5173)
3. MongoDB có dữ liệu? (chạy testConnection.js)
4. API hoạt động? (mở http://localhost:5000/api/properties)

## 📝 Scripts Hữu Ích

```bash
# Test kết nối MongoDB
node scripts/testConnection.js

# Tạo admin
node scripts/createAdmin.js

# Seed dữ liệu
node scripts/seedData.js

# Thêm masterplans cho projects
node scripts/addMasterPlans.js

# Start server (development)
npm run dev

# Start server (production)
npm start
```

## 🔄 Reset Dữ Liệu

Nếu muốn reset và seed lại:

```bash
cd server

# Seed lại (tự động xóa dữ liệu cũ)
node scripts/seedData.js

# Tạo lại admin nếu cần
node scripts/createAdmin.js
```

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Đọc `FIX-MONGODB-TIMEOUT.md`
2. Kiểm tra console logs
3. Test từng bước một
4. Dùng MongoDB local nếu Atlas không được

---

**Lưu ý:** Dữ liệu mẫu chỉ để test. Production cần dữ liệu thật!
