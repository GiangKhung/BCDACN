# 🔧 Hướng dẫn sửa lỗi đăng nhập Admin

## ❌ Vấn đề
- Không thể đăng nhập bằng tài khoản admin
- Lỗi 401 (Unauthorized) khi truy cập Admin API
- Token cũ không hợp lệ sau khi sửa code

## 🔍 Nguyên nhân
Sau khi sửa code JWT (đổi từ `id` sang `userId`), token cũ không còn hợp lệ. User cần:
1. Xóa token cũ
2. Đăng nhập lại để lấy token mới

## ✅ Giải pháp

### Bước 1: Đảm bảo Server đang chạy

```bash
# Kiểm tra server có đang chạy không
netstat -ano | findstr :5000

# Nếu chưa chạy, start server
.\start-all.bat
```

Server phải chạy tại: **http://localhost:5000**

### Bước 2: Xóa token cũ và đăng nhập lại

**Cách 1: Dùng file test (Khuyến nghị)**

1. Mở file: `test-admin-login.html` trong trình duyệt
2. Click nút **"🗑️ Xóa Token"** để xóa token cũ
3. Click nút **"🔑 Đăng nhập"** để lấy token mới
4. Click nút **"🚀 Mở Admin Panel"** để vào trang quản trị

**Cách 2: Xóa thủ công trong trình duyệt**

1. Mở http://localhost:3000
2. Nhấn F12 để mở DevTools
3. Vào tab **Console**
4. Chạy lệnh:
   ```javascript
   localStorage.removeItem('token')
   localStorage.removeItem('user')
   ```
5. Đăng nhập lại tại: http://localhost:3000/login

### Bước 3: Kiểm tra kết quả

Sau khi đăng nhập thành công:
- Token mới đã được lưu vào localStorage
- Có thể truy cập Admin Panel tại: http://localhost:3000/admin
- Có thể test các API admin

## 📋 Thông tin tài khoản Admin

```
Email:    admin@batdongsan.com
Password: admin123456
Role:     admin
```

## 🧪 Test Admin API

Dùng file `test-admin-login.html` để test:
- ✅ Kiểm tra kết nối server
- ✅ Đăng nhập và lấy token
- ✅ Test API: Stats, Users, Properties
- ✅ Mở Admin Panel

## 🔧 Tạo lại tài khoản Admin (nếu cần)

```bash
cd server
node scripts/createAdmin.js
```

Script sẽ:
- Kiểm tra xem admin đã tồn tại chưa
- Nếu chưa có: tạo admin mới
- Nếu đã có: cập nhật role thành admin

## 📊 Kiểm tra dữ liệu trong MongoDB

```bash
cd server
node scripts/testConnection.js
```

## 🚀 Start toàn bộ hệ thống

```bash
# Start cả server và client
.\start-all.bat

# Hoặc start riêng lẻ
cd server && npm run dev
cd client && npm run dev
```

## 🌐 URLs quan trọng

- **Server API**: http://localhost:5000
- **Client**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Login**: http://localhost:3000/login
- **Test Login**: Mở file `test-admin-login.html`

## ⚠️ Lưu ý

1. **Port 5000**: Server phải chạy ở port 5000
2. **Port 3000**: Client phải chạy ở port 3000 (Vite đã config)
3. **Token cũ**: Không hợp lệ sau khi sửa code - phải đăng nhập lại
4. **CORS**: Server đã bật CORS, không cần config thêm
5. **MongoDB**: Phải kết nối thành công với MongoDB Atlas

## 🐛 Troubleshooting

### Lỗi: "Không thể kết nối server"
- Kiểm tra server có đang chạy không: `netstat -ano | findstr :5000`
- Start server: `.\start-all.bat`

### Lỗi: 401 Unauthorized
- Token cũ không hợp lệ
- Xóa token và đăng nhập lại

### Lỗi: "Cannot find module"
- Cài đặt dependencies: `npm install`

### Lỗi: MongoDB timeout
- Xem hướng dẫn: `FIX-MONGODB-TIMEOUT.md`
- Whitelist IP trên MongoDB Atlas

## 📚 Tài liệu liên quan

- `HUONG-DAN-ADMIN.md` - Hướng dẫn sử dụng Admin Panel
- `QUICK-START-ADMIN.md` - Quick start Admin
- `START-DEV.md` - Hướng dẫn start development
- `FIX-MONGODB-TIMEOUT.md` - Sửa lỗi MongoDB timeout
