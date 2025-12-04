# Hướng Dẫn Sử Dụng Chức Năng Đăng Nhập & Đăng Ký

## 📋 Tổng Quan

Hệ thống đăng nhập và đăng ký đã được tích hợp vào thanh công cụ phía trên của trang web, cho phép người dùng:
- Đăng ký tài khoản mới
- Đăng nhập vào hệ thống
- Quản lý thông tin cá nhân
- Đăng xuất

## 🚀 Cách Sử Dụng

### 1. Đăng Ký Tài Khoản Mới

**Bước 1:** Nhấn vào nút **"Đăng ký"** trên thanh công cụ phía trên

**Bước 2:** Nhập số điện thoại và nhấn **"Tiếp tục"**

**Bước 3:** Điền đầy đủ thông tin:
- Họ và tên
- Email
- Mật khẩu (tối thiểu 6 ký tự)
- Xác nhận mật khẩu

**Bước 4:** Nhấn **"Đăng ký"** để hoàn tất

✅ Sau khi đăng ký thành công, bạn sẽ được tự động đăng nhập vào hệ thống.

### 2. Đăng Nhập

**Bước 1:** Nhấn vào nút **"Đăng nhập"** trên thanh công cụ

**Bước 2:** Nhập thông tin:
- Email hoặc tên đăng nhập
- Mật khẩu

**Bước 3:** (Tùy chọn) Chọn **"Nhớ tài khoản"** để lưu thông tin đăng nhập

**Bước 4:** Nhấn **"Đăng nhập"**

### 3. Quản Lý Tài Khoản

Sau khi đăng nhập, bạn sẽ thấy tên của mình trên thanh công cụ. Nhấn vào tên để mở menu với các tùy chọn:

- **Tài khoản của tôi**: Xem và chỉnh sửa thông tin cá nhân
- **Tin đăng của tôi**: Quản lý các tin đăng bất động sản của bạn
- **Tin đã lưu**: Xem danh sách các tin đã lưu yêu thích
- **Đăng xuất**: Thoát khỏi tài khoản

### 4. Đăng Xuất

Nhấn vào tên của bạn trên thanh công cụ → Chọn **"Đăng xuất"**

## 🔐 Bảo Mật

- Mật khẩu được mã hóa bằng bcrypt trước khi lưu vào database
- Sử dụng JWT (JSON Web Token) để xác thực người dùng
- Token được lưu trong localStorage của trình duyệt
- Thời gian hiệu lực của token: 30 ngày

## 🛠️ Kỹ Thuật

### Backend API

**Endpoint đăng ký:**
```
POST http://localhost:5000/api/auth/register
```

Body:
```json
{
  "name": "Nguyễn Văn A",
  "email": "example@email.com",
  "phone": "0123456789",
  "password": "password123"
}
```

**Endpoint đăng nhập:**
```
POST http://localhost:5000/api/auth/login
```

Body:
```json
{
  "email": "example@email.com",
  "password": "password123"
}
```

**Endpoint lấy thông tin user:**
```
GET http://localhost:5000/api/auth/me
```

Headers:
```
Authorization: Bearer <token>
```

### Frontend

**Lưu trữ thông tin:**
- Token: `localStorage.getItem('token')`
- User info: `localStorage.getItem('user')`

**Events:**
- `userLoggedIn`: Được dispatch khi đăng nhập thành công
- `userLoggedOut`: Được dispatch khi đăng xuất

## 📦 Dependencies

### Backend
- `bcryptjs`: Mã hóa mật khẩu
- `jsonwebtoken`: Tạo và xác thực JWT token
- `express`: Web framework
- `mongoose`: MongoDB ODM

### Frontend
- `react-router-dom`: Routing
- React hooks: `useState`, `useEffect`

## 🔧 Cài Đặt

### 1. Cài đặt dependencies cho server:
```bash
cd server
npm install bcryptjs jsonwebtoken
```

### 2. Cấu hình biến môi trường:
Thêm vào file `server/.env`:
```
JWT_SECRET=batdongsan_secret_key_2024_very_secure_random_string
```

### 3. Khởi động server:
```bash
cd server
npm run dev
```

### 4. Khởi động client:
```bash
cd client
npm run dev
```

## 🎨 Giao Diện

- **Modal đăng nhập/đăng ký**: Hiển thị dạng popup overlay
- **Responsive**: Tương thích với mọi kích thước màn hình
- **Animation**: Hiệu ứng mượt mà khi mở/đóng modal
- **User menu**: Dropdown menu với avatar và thông tin user

## 🚧 Tính Năng Sắp Tới

- [ ] Đăng nhập bằng Google
- [ ] Đăng nhập bằng Apple
- [ ] Quên mật khẩu
- [ ] Xác thực email
- [ ] Xác thực số điện thoại (OTP)
- [ ] Đổi mật khẩu
- [ ] Cập nhật thông tin cá nhân
- [ ] Upload avatar

## ❓ Xử Lý Lỗi

### Lỗi thường gặp:

**1. "Email đã được sử dụng"**
- Nguyên nhân: Email đã tồn tại trong hệ thống
- Giải pháp: Sử dụng email khác hoặc đăng nhập

**2. "Email hoặc mật khẩu không đúng"**
- Nguyên nhân: Thông tin đăng nhập sai
- Giải pháp: Kiểm tra lại email và mật khẩu

**3. "Không thể kết nối đến server"**
- Nguyên nhân: Server chưa chạy hoặc lỗi kết nối
- Giải pháp: Kiểm tra server đã chạy tại http://localhost:5000

**4. "Mật khẩu phải có ít nhất 6 ký tự"**
- Nguyên nhân: Mật khẩu quá ngắn
- Giải pháp: Sử dụng mật khẩu dài hơn 6 ký tự

**5. "Mật khẩu xác nhận không khớp"**
- Nguyên nhân: Mật khẩu và xác nhận mật khẩu không giống nhau
- Giải pháp: Nhập lại cho khớp

## 📞 Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console của trình duyệt (F12)
2. Kiểm tra log của server
3. Đảm bảo MongoDB đang chạy
4. Đảm bảo tất cả dependencies đã được cài đặt

## 📝 Ghi Chú

- Thông tin đăng nhập được lưu trong localStorage, sẽ mất khi xóa cache trình duyệt
- Token có thời hạn 30 ngày, sau đó cần đăng nhập lại
- Mật khẩu không thể khôi phục, chỉ có thể đặt lại (tính năng sắp có)
