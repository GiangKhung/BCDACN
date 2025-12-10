# Hướng Dẫn Sửa Lỗi Tin Đăng Của Tôi

## Vấn đề
Khi đăng tin, bài đăng không hiển thị trong "Tin đăng của tôi"

## Nguyên nhân
- Property model thiếu field `userId` để liên kết với user
- API không xác thực user khi tạo property
- MyProperties lấy dữ liệu sai cách

## Giải pháp đã thực hiện

### 1. Cập nhật Property Model
Đã thêm field `userId` vào `server/models/Property.js`:
```javascript
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}
```

### 2. Cập nhật API Routes
Đã thêm vào `server/routes/properties.js`:
- Middleware `auth` để xác thực user
- Route `POST /api/properties` giờ yêu cầu token và lưu userId
- Route mới `GET /api/properties/my-properties` để lấy tin của user

### 3. Cập nhật MyProperties
File `client/src/pages/MyProperties.jsx` giờ gọi API mới với token

## Cách Khắc Phục

### Bước 1: Restart Server
**QUAN TRỌNG:** Bạn PHẢI restart server để code mới có hiệu lực!

```bash
# Dừng server hiện tại (Ctrl+C)
# Sau đó chạy lại:
cd server
npm start
```

### Bước 2: Test Lại
1. Đăng nhập vào tài khoản
2. Đăng tin mới (tin cũ không có userId nên không hiển thị)
3. Vào "Tin đăng của tôi" để kiểm tra

### Bước 3: Xử lý Tin Cũ (Tùy chọn)
Nếu muốn giữ tin cũ, bạn cần cập nhật userId cho chúng:

```javascript
// Chạy script này trong MongoDB hoặc tạo migration
// Cập nhật tất cả properties có email khớp với user
db.properties.updateMany(
  { "agent.email": "your-email@example.com" },
  { $set: { userId: ObjectId("your-user-id") } }
)
```

## Kiểm Tra Lỗi

### Nếu vẫn lỗi 500:
1. Kiểm tra server console có log lỗi gì
2. Đảm bảo đã import jwt: `import jwt from 'jsonwebtoken'`
3. Kiểm tra JWT_SECRET trong file `.env`

### Nếu không hiển thị tin:
1. Đảm bảo đã đăng nhập
2. Token phải hợp lệ (kiểm tra localStorage)
3. Chỉ tin mới đăng sau khi sửa mới có userId

## Cấu Trúc API Mới

### POST /api/properties
```javascript
Headers: {
  'Authorization': 'Bearer <token>',
  'Content-Type': 'application/json'
}
Body: {
  title: "...",
  price: 1000000,
  // ... các field khác
}
// Server tự động thêm userId từ token
```

### GET /api/properties/my-properties
```javascript
Headers: {
  'Authorization': 'Bearer <token>'
}
// Trả về: Array of properties có userId khớp
```

## Lưu Ý
- Tin đăng cũ (trước khi sửa) không có userId nên không hiển thị
- Chỉ tin mới đăng sau khi restart server mới được lưu đúng
- Phải đăng nhập mới xem được "Tin đăng của tôi"
