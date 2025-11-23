# Hướng Dẫn Cập Nhật Dữ Liệu Chi Tiết

## Thông Tin Mới Đã Thêm

### 1. Model Property Mới

Đã cập nhật model với các trường thông tin chi tiết:

**Địa chỉ chi tiết:**
- `address.street` - Tên đường
- `address.ward` - Phường/Xã
- `address.district` - Quận/Huyện
- `address.city` - Thành phố
- `address.fullAddress` - Địa chỉ đầy đủ

**Thông tin cơ bản:**
- `propertyType` - Loại hình (apartment, house, villa, land, townhouse, office, shophouse)
- `floors` - Số tầng
- `width` - Chiều ngang (m)
- `length` - Chiều dài (m)
- `direction` - Hướng nhà
- `balconyDirection` - Hướng ban công

**Pháp lý & Nội thất:**
- `legalDocument` - Giấy tờ pháp lý (red-book, pink-book, sale-contract, waiting)
- `furniture` - Tình trạng nội thất (full, basic, empty)

**Đặc điểm & Tiện ích:**
- `features[]` - Mảng các đặc điểm nổi bật
- `amenities[]` - Mảng các tiện ích

**Thông tin dự án:**
- `project.name` - Tên dự án
- `project.developer` - Chủ đầu tư
- `project.handoverYear` - Năm bàn giao

**Thông tin bổ sung:**
- `yearBuilt` - Năm xây dựng
- `roadWidth` - Chiều rộng đường (m)
- `distanceToRoad` - Cách mặt đường (m)
- `views` - Lượt xem
- `favorites` - Lượt yêu thích

**Thông tin người đăng:**
- `agent.phone` - Số điện thoại
- `agent.email` - Email
- `agent.avatar` - Ảnh đại diện

### 2. Trang Chi Tiết Mới

Trang PropertyDetail đã được cập nhật với các phần:

1. **Breadcrumb** - Điều hướng
2. **Gallery ảnh** - Hiển thị ảnh chính với badge
3. **Thông tin cơ bản** - Giá, diện tích, phòng ngủ, phòng tắm
4. **Thông tin chi tiết** - Loại hình, số tầng, hướng nhà, pháp lý, nội thất
5. **Đặc điểm BDS** - Các điểm nổi bật
6. **Tiện ích** - Các tiện ích xung quanh
7. **Thông tin dự án** - Tên dự án, chủ đầu tư
8. **Mô tả chi tiết** - Mô tả đầy đủ
9. **Địa chỉ** - Địa chỉ chi tiết
10. **Sidebar liên hệ** - Thông tin người đăng, các nút action
11. **Thống kê** - Lượt xem, lượt yêu thích

## Cách Chạy Seed Data

### Bước 1: Đảm bảo MongoDB đang chạy

```bash
# Kiểm tra MongoDB
mongosh
```

### Bước 2: Cập nhật file .env

Đảm bảo file `server/.env` có:
```
MONGODB_URI=mongodb://localhost:27017/batdongsan
PORT=5000
```

### Bước 3: Chạy seed data

```bash
cd server
npm run seed
```

Hoặc:

```bash
cd server
node scripts/seedData.js
```

### Bước 4: Kiểm tra dữ liệu

```bash
mongosh
use batdongsan
db.properties.find().pretty()
```

## Dữ Liệu Mẫu

### File `server/data/detailedProperties.js`

Chứa 2 bất động sản mẫu với đầy đủ thông tin:

1. **Biệt thự Ciputra** - Tây Hồ, Hà Nội
   - Đầy đủ thông tin chi tiết
   - 13 ảnh
   - Nhiều đặc điểm và tiện ích
   - Thông tin dự án đầy đủ

2. **Căn hộ Vinhomes Central Park** - Bình Thạnh, TP.HCM
   - View sông
   - Nội thất cao cấp
   - 15 ảnh
   - Tiện ích 5 sao

## Cấu Trúc Dữ Liệu Mẫu

```javascript
{
    title: 'Tiêu đề BDS',
    location: 'Quận, Thành phố',
    address: {
        street: 'Tên đường',
        ward: 'Phường',
        district: 'Quận',
        city: 'Thành phố',
        fullAddress: 'Địa chỉ đầy đủ'
    },
    price: 8500000000,
    pricePerSqm: 75,
    propertyType: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    floors: 1,
    area: 113,
    direction: 'east',
    balconyDirection: 'south',
    legalDocument: 'red-book',
    furniture: 'full',
    features: [
        'Đặc điểm 1',
        'Đặc điểm 2'
    ],
    amenities: [
        'Tiện ích 1',
        'Tiện ích 2'
    ],
    description: 'Mô tả chi tiết...',
    project: {
        name: 'Tên dự án',
        developer: 'Chủ đầu tư',
        handoverYear: 2025
    },
    agent: {
        name: 'Tên người đăng',
        phone: '0901234***',
        status: 'Chính chủ'
    },
    yearBuilt: 2024,
    views: 1250,
    favorites: 45
}
```

## Lưu Ý

1. **Backup dữ liệu cũ** trước khi chạy seed (nếu cần)
2. **Seed sẽ xóa toàn bộ** dữ liệu cũ trong collection `properties`
3. Sau khi seed, **restart server** để áp dụng thay đổi
4. Kiểm tra dữ liệu trong MongoDB Compass hoặc mongosh

## Kiểm Tra Kết Quả

1. Truy cập: http://localhost:3000
2. Click vào bất kỳ BDS nào
3. Xem trang chi tiết với đầy đủ thông tin mới

## Thêm Dữ Liệu Mới

Để thêm BDS mới với đầy đủ thông tin:

1. Mở file `server/data/detailedProperties.js`
2. Thêm object mới vào mảng `detailedProperties`
3. Chạy lại seed: `npm run seed`

## Troubleshooting

### Lỗi kết nối MongoDB
```bash
# Khởi động MongoDB
mongod
```

### Lỗi module not found
```bash
cd server
npm install
```

### Dữ liệu không hiển thị
1. Kiểm tra MongoDB đang chạy
2. Kiểm tra server đang chạy: `npm run dev`
3. Kiểm tra client đang chạy: `cd client && npm start`
4. Clear cache trình duyệt

## API Endpoints

Các endpoint đã hỗ trợ đầy đủ thông tin mới:

- `GET /api/properties` - Lấy danh sách (có search & filter)
- `GET /api/properties/:id` - Lấy chi tiết 1 BDS
- `POST /api/properties` - Tạo BDS mới
- `PUT /api/properties/:id` - Cập nhật BDS
- `DELETE /api/properties/:id` - Xóa BDS

## Tính Năng Mới

✅ Hiển thị đầy đủ thông tin chi tiết
✅ Phân loại theo loại hình BDS
✅ Hiển thị hướng nhà, hướng ban công
✅ Thông tin pháp lý rõ ràng
✅ Danh sách đặc điểm và tiện ích
✅ Thông tin dự án (nếu có)
✅ Địa chỉ chi tiết
✅ Thống kê lượt xem, yêu thích
✅ Giao diện đẹp, responsive
✅ Tương thích với batdongsan.com.vn
