# 📋 Hướng dẫn hệ thống duyệt bài

## 🎯 Tổng quan

Hệ thống duyệt bài giúp Admin kiểm soát chất lượng tin đăng trước khi hiển thị công khai.

### Quy trình:
1. **User đăng tin** → Trạng thái: `Chờ duyệt` (pending)
2. **Admin xem xét** → Duyệt hoặc Từ chối
3. **Tin được duyệt** → Hiển thị công khai
4. **Tin bị từ chối** → Không hiển thị, có lý do từ chối

## 🔧 Cấu trúc Database

### Property Model - Trường mới:

```javascript
approvalStatus: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: 'pending'
}

rejectionReason: {
  type: String  // Lý do từ chối
}

approvedBy: {
  type: ObjectId,
  ref: 'User'  // Admin duyệt bài
}

approvedAt: {
  type: Date  // Thời gian duyệt
}
```

### Trạng thái tin đăng:

| Trạng thái | Mô tả | Hiển thị công khai |
|-----------|-------|-------------------|
| `pending` | Chờ admin duyệt | ❌ Không |
| `approved` | Đã được duyệt | ✅ Có |
| `rejected` | Bị từ chối | ❌ Không |

## 📊 Trang Admin - Chức năng

### 1. Dashboard
Hiển thị thống kê:
- Tổng tin đăng
- Tin đã duyệt
- Tin chờ duyệt
- Tin bị từ chối
- Người dùng mới tháng này
- Tin đăng mới tháng này

### 2. Quản lý bất động sản

#### Bộ lọc:
- **Tất cả**: Hiển thị tất cả tin
- **Chờ duyệt**: Chỉ tin pending
- **Đã duyệt**: Chỉ tin approved
- **Từ chối**: Chỉ tin rejected

#### Thao tác:
- **Duyệt tin** (✓): Chuyển trạng thái sang `approved`
- **Từ chối** (✗): Chuyển sang `rejected` + nhập lý do
- **Xem lý do** (ℹ): Xem lý do từ chối (nếu có)
- **Xóa** (🗑): Xóa tin vĩnh viễn

## 🔌 API Endpoints

### 1. Lấy thống kê
```
GET /api/admin/stats
Headers: Authorization: Bearer {token}

Response:
{
  totalUsers: 10,
  totalProperties: 50,
  approvedProperties: 30,
  pendingProperties: 15,
  rejectedProperties: 5,
  activeUsers: 8,
  newUsersThisMonth: 3,
  newPropertiesThisMonth: 12
}
```

### 2. Lấy danh sách tin đăng
```
GET /api/admin/properties?page=1&limit=10&approvalStatus=pending
Headers: Authorization: Bearer {token}

Response:
{
  properties: [...],
  total: 50,
  page: 1,
  pages: 5
}
```

### 3. Duyệt tin
```
PUT /api/admin/properties/:id/approve
Headers: Authorization: Bearer {token}

Response:
{
  message: "Duyệt tin thành công",
  property: {...}
}
```

### 4. Từ chối tin
```
PUT /api/admin/properties/:id/reject
Headers: Authorization: Bearer {token}
Body: {
  reason: "Hình ảnh không rõ ràng"
}

Response:
{
  message: "Từ chối tin thành công",
  property: {...}
}
```

### 5. Xóa tin
```
DELETE /api/admin/properties/:id
Headers: Authorization: Bearer {token}

Response:
{
  message: "Xóa bất động sản thành công"
}
```

## 👤 Quy trình User đăng tin

### 1. User đăng tin mới
```javascript
// Tin tự động có approvalStatus = 'pending'
const newProperty = {
  title: "Nhà đẹp...",
  location: "Hà Nội",
  price: 5000000000,
  // ... các trường khác
  approvalStatus: 'pending'  // Mặc định
}
```

### 2. Tin không hiển thị công khai
- API `/api/properties` chỉ trả về tin có `approvalStatus: 'approved'`
- User chỉ thấy tin của mình trong "Tin đăng của tôi"

### 3. Admin duyệt tin
- Admin vào trang quản trị
- Xem danh sách tin chờ duyệt
- Duyệt hoặc từ chối

### 4. Tin được hiển thị
- Sau khi duyệt, tin xuất hiện trên trang chủ
- User có thể thấy tin của mình công khai

## 🎨 Giao diện Admin

### Dashboard
```
┌─────────────────────────────────────────┐
│  📊 Dashboard                           │
├─────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │ 👥   │  │ 🏠   │  │ ✓    │         │
│  │ 100  │  │ 50   │  │ 30   │         │
│  │Users │  │Posts │  │Approved│       │
│  └──────┘  └──────┘  └──────┘         │
│                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │ ⏳   │  │ ✗    │  │ 👤   │         │
│  │ 15   │  │ 5    │  │ 80   │         │
│  │Pending│ │Rejected│ │Active│        │
│  └──────┘  └──────┘  └──────┘         │
└─────────────────────────────────────────┘
```

### Quản lý bất động sản
```
┌─────────────────────────────────────────┐
│  🏠 Quản lý bất động sản                │
├─────────────────────────────────────────┤
│  [Tất cả] [Chờ duyệt] [Đã duyệt] [Từ chối] │
├─────────────────────────────────────────┤
│  Tiêu đề    │ Giá    │ Trạng thái │ Thao tác │
│  Nhà đẹp... │ 5 tỷ   │ [Chờ duyệt]│ [✓][✗][🗑]│
│  Căn hộ...  │ 3 tỷ   │ [Đã duyệt] │ [🗑]     │
│  Đất nền... │ 2 tỷ   │ [Từ chối]  │ [ℹ][🗑]  │
└─────────────────────────────────────────┘
```

## 🚀 Hướng dẫn sử dụng

### Đăng nhập Admin
1. Vào: http://localhost:3000/login
2. Đăng nhập với tài khoản admin:
   - Email: `admin@batdongsan.com`
   - Password: `admin123456`
3. Tự động chuyển đến: http://localhost:3000/admin

### Duyệt tin
1. Click tab "Bất động sản"
2. Click filter "Chờ duyệt"
3. Xem danh sách tin chờ duyệt
4. Click nút **✓** để duyệt tin
5. Hoặc click nút **✗** để từ chối (nhập lý do)

### Xem lý do từ chối
1. Click filter "Từ chối"
2. Click nút **ℹ** để xem lý do từ chối

### Xóa tin
1. Click nút **🗑** ở bất kỳ tin nào
2. Xác nhận xóa

## 📝 Lưu ý quan trọng

### 1. Tin mới mặc định là "Chờ duyệt"
- Tất cả tin đăng mới đều có `approvalStatus: 'pending'`
- Không hiển thị công khai cho đến khi được duyệt

### 2. Chỉ tin "Đã duyệt" hiển thị công khai
- API `/api/properties` có filter: `approvalStatus: 'approved'`
- Trang chủ, tìm kiếm chỉ hiển thị tin đã duyệt

### 3. Từ chối tin phải có lý do
- Bắt buộc nhập lý do khi từ chối
- Lý do được lưu vào `rejectionReason`
- User có thể xem lý do (nếu implement)

### 4. Admin không thể tự hạ quyền
- Admin không thể thay đổi role của chính mình
- Admin không thể xóa tài khoản của chính mình

## 🔒 Bảo mật

### Middleware
- `auth.js`: Xác thực JWT token
- `adminAuth.js`: Kiểm tra role admin

### Quyền truy cập
- Chỉ admin mới truy cập được `/api/admin/*`
- Token phải hợp lệ và role phải là 'admin'

## 🐛 Troubleshooting

### Lỗi: "Không có quyền truy cập"
- Kiểm tra token có hợp lệ không
- Kiểm tra role có phải 'admin' không
- Đăng nhập lại để lấy token mới

### Tin không hiển thị sau khi đăng
- Đây là tính năng, không phải lỗi
- Tin phải được admin duyệt trước

### Không thấy nút duyệt/từ chối
- Chỉ tin "Chờ duyệt" mới có nút này
- Tin "Đã duyệt" hoặc "Từ chối" không có

## 📚 Files liên quan

### Backend:
- `server/models/Property.js` - Model với trường approvalStatus
- `server/routes/admin.js` - API admin
- `server/routes/properties.js` - API properties (có filter approved)
- `server/middleware/auth.js` - Xác thực JWT
- `server/middleware/adminAuth.js` - Kiểm tra admin

### Frontend:
- `client/src/pages/Admin.jsx` - Trang quản trị
- `client/src/pages/Admin.css` - Styling
- `client/src/pages/Login.jsx` - Trang đăng nhập

## 🎯 Tính năng mở rộng (có thể thêm)

1. **Thông báo cho user**
   - Gửi email khi tin được duyệt/từ chối
   - Hiển thị thông báo trong app

2. **Lịch sử duyệt bài**
   - Lưu lại ai duyệt, khi nào
   - Xem lịch sử thay đổi trạng thái

3. **Duyệt hàng loạt**
   - Chọn nhiều tin cùng lúc
   - Duyệt/từ chối hàng loạt

4. **Bình luận nội bộ**
   - Admin có thể để lại ghi chú
   - Trao đổi giữa các admin

5. **Tự động duyệt**
   - Duyệt tự động cho user tin cậy
   - Dựa trên lịch sử đăng tin tốt
