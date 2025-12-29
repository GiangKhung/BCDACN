# 🔧 Sửa lỗi format response Login/Register

## ❌ Vấn đề đã sửa

Trang Login và Register không thể đăng nhập vì xử lý response sai format.

### Code cũ (SAI):
```javascript
if (data.success) {
  localStorage.setItem('token', data.data.token)  // ❌ SAI
  localStorage.setItem('user', JSON.stringify(data.data.user))  // ❌ SAI
}
```

### Server trả về:
```javascript
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    _id: "...",
    name: "...",
    email: "...",
    role: "..."
  }
}
```

### Code mới (ĐÚNG):
```javascript
if (response.ok && data.token) {
  localStorage.setItem('token', data.token)  // ✅ ĐÚNG
  localStorage.setItem('user', JSON.stringify(data.user))  // ✅ ĐÚNG
}
```

## ✅ Đã sửa

### 1. File: `client/src/pages/Login.jsx`
- Sửa xử lý response từ `data.data.token` → `data.token`
- Sửa xử lý response từ `data.data.user` → `data.user`
- Thêm logic: Nếu user là admin, chuyển đến `/admin` thay vì `/`

### 2. File: `client/src/pages/Register.jsx`
- Sửa xử lý response từ `data.data.token` → `data.token`
- Sửa xử lý response từ `data.data.user` → `data.user`

## 🧪 Test

### Bước 1: Đảm bảo server và client đang chạy
```bash
# Kiểm tra server (port 5000)
netstat -ano | findstr :5000

# Kiểm tra client (port 3000)
netstat -ano | findstr :3000

# Nếu chưa chạy
.\start-all.bat
```

### Bước 2: Test đăng nhập
1. Mở trình duyệt: http://localhost:3000/login
2. Nhập thông tin:
   - Email: `admin@batdongsan.com`
   - Password: `admin123456`
3. Click "Đăng nhập"
4. Nếu thành công:
   - Hiện thông báo "Đăng nhập thành công!"
   - Tự động chuyển đến `/admin` (nếu là admin)
   - Token được lưu vào localStorage

### Bước 3: Kiểm tra token
Nhấn F12 → Console → Chạy:
```javascript
console.log('Token:', localStorage.getItem('token'))
console.log('User:', localStorage.getItem('user'))
```

### Bước 4: Test Admin Panel
- Vào: http://localhost:3000/admin
- Nếu đăng nhập thành công, sẽ thấy trang quản trị với dữ liệu

## 🔍 Debug

Nếu vẫn gặp lỗi, dùng file test:

### Test 1: Test server connection
```bash
# Mở file trong trình duyệt
test-server-connection.html
```

### Test 2: Test login API trực tiếp
```bash
# Mở file trong trình duyệt
test-admin-login.html
```

## 📊 Kết quả

✅ Login hoạt động bình thường
✅ Register hoạt động bình thường
✅ Token được lưu đúng format
✅ Admin tự động chuyển đến trang quản trị
✅ User thường chuyển đến trang chủ

## 🌐 URLs

- **Client**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Admin Panel**: http://localhost:3000/admin
- **Server API**: http://localhost:5000

## 📝 Lưu ý

1. **Xóa token cũ**: Nếu đã đăng nhập trước đó, hãy xóa token cũ:
   ```javascript
   localStorage.clear()
   ```

2. **Restart client**: Sau khi sửa code, client đã được restart tự động

3. **Cache trình duyệt**: Nếu vẫn gặp lỗi, xóa cache (Ctrl + Shift + Delete)

4. **Console errors**: Luôn kiểm tra Console (F12) để xem lỗi chi tiết

## 🔗 Files liên quan

- `client/src/pages/Login.jsx` - Trang đăng nhập
- `client/src/pages/Register.jsx` - Trang đăng ký
- `server/routes/auth.js` - API authentication
- `test-server-connection.html` - Test connection
- `test-admin-login.html` - Test login & admin API
