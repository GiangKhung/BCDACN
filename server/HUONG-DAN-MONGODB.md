# Hướng Dẫn Setup MongoDB

## 🎯 Đã Setup Xong

✅ Đã cài đặt mongoose và dotenv
✅ Đã tạo model Property
✅ Đã tạo config kết nối database
✅ Đã cập nhật routes với async/await
✅ Đã tạo script seed data

## 📋 Các Bước Tiếp Theo

### Bước 1: Cài đặt MongoDB

**Chọn 1 trong 2 cách:**

#### Cách 1: MongoDB Local (Cài trên máy)
1. Tải MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Cài đặt và chạy MongoDB
3. Giữ nguyên file `.env` hiện tại

#### Cách 2: MongoDB Atlas (Cloud - Khuyến nghị)
1. Đăng ký tài khoản miễn phí: https://www.mongodb.com/cloud/atlas/register
2. Tạo cluster mới (chọn FREE tier)
3. Tạo database user (username/password)
4. Whitelist IP: 0.0.0.0/0 (cho phép tất cả)
5. Lấy connection string
6. Cập nhật file `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/real-estate-db
```

### Bước 2: Import Dữ Liệu Mẫu

Chạy lệnh sau để import dữ liệu từ file `properties.js`:

```bash
npm run seed
```

### Bước 3: Chạy Server

```bash
npm run dev
```

## 🔧 API Endpoints Mới

### GET /api/properties
Lấy tất cả bất động sản

### GET /api/properties/:id
Lấy chi tiết 1 bất động sản (dùng MongoDB _id)

### POST /api/properties
Tạo bất động sản mới
```json
{
  "title": "Nhà đẹp",
  "location": "Hà Nội",
  "price": 5000000000,
  "area": 100,
  "bedrooms": 3,
  "bathrooms": 2,
  "image": "https://example.com/image.jpg"
}
```

### PUT /api/properties/:id
Cập nhật bất động sản

### DELETE /api/properties/:id
Xóa bất động sản

## ⚠️ Lưu Ý Quan Trọng

### Cập nhật Frontend

Sau khi import dữ liệu, MongoDB sẽ tạo `_id` thay vì `id`. Bạn cần cập nhật frontend:

**Trong PropertyDetail.jsx và các component khác:**
```javascript
// Cũ
const property = properties.find(p => p.id === parseInt(id))

// Mới
const property = properties.find(p => p._id === id)
```

**Trong PropertyCard.jsx:**
```javascript
// Cũ
<Link to={`/property/${property.id}`}>

// Mới
<Link to={`/property/${property._id}`}>
```

## 🧪 Test API

Mở file `client/test-api.html` trong browser để test các API endpoints.

## 📁 Cấu Trúc File Mới

```
server/
├── config/
│   └── database.js          # Kết nối MongoDB
├── models/
│   └── Property.js          # Schema Property
├── scripts/
│   └── seedData.js          # Import dữ liệu mẫu
├── .env                     # Cấu hình môi trường
└── routes/
    └── properties.js        # API routes (đã cập nhật)
```

## 🚀 Tính Năng Mới

- ✅ CRUD đầy đủ (Create, Read, Update, Delete)
- ✅ Tự động tạo timestamps (createdAt, updatedAt)
- ✅ Validation dữ liệu
- ✅ Error handling
- ✅ Sắp xếp theo ngày tạo mới nhất

## 💡 Tips

- Dùng MongoDB Compass để xem dữ liệu trực quan
- Backup dữ liệu thường xuyên
- Đừng commit file `.env` lên Git (đã có trong .gitignore)
