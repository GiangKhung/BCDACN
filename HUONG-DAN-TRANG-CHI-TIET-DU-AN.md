# Hướng Dẫn Trang Chi Tiết Dự Án

## Tổng Quan

Trang chi tiết dự án được thiết kế dựa trên mẫu từ batdongsan.com.vn, cung cấp thông tin đầy đủ và chi tiết về từng dự án bất động sản.

## Các Phần Chính

### 1. Header
- **Breadcrumb**: Đường dẫn điều hướng (Dự án / Thành phố / Quận / Tên dự án)
- **Tiêu đề dự án**: Tên dự án và địa chỉ đầy đủ
- **Nút chia sẻ**: Cho phép chia sẻ dự án lên mạng xã hội

### 2. Thư Viện Hình Ảnh
- **Hình ảnh chính**: Hiển thị hình ảnh lớn với badge trạng thái (Đang mở bán/Đã bàn giao)
- **Thumbnail grid**: 4 hình ảnh nhỏ có thể click để xem
- **Bộ đếm hình ảnh**: Hiển thị tổng số hình ảnh

### 3. Navigation Tabs (Sticky)
Các tab điều hướng cố định khi scroll:
- **Tổng quan**: Thông tin tổng quát về dự án
- **Thông tin chi tiết**: Thông số kỹ thuật, tiến độ, pháp lý
- **Mặt bằng dự án**: Sơ đồ tổng thể
- **Vị trí**: Bản đồ và tiện ích lân cận
- **Ước tính khoản vay**: Công cụ tính toán (đang phát triển)

### 4. Nội Dung Chi Tiết

#### Tab Tổng Quan
- Hình ảnh thực tế dự án
- Mô tả chi tiết về dự án
- **Thông tin cơ bản**:
  - Tên dự án
  - Vị trí
  - Chủ đầu tư
  - Quy mô (ha)
  - Số căn
  - Loại hình sản phẩm
  - Mức giá
  - Tiến độ (%)
- **Tiện ích nội khu**: Grid hiển thị các tiện ích
- **Chính sách bán hàng**: Danh sách ưu đãi và chính sách

#### Tab Thông Tin Chi Tiết
- **Thông tin dự án**: Bảng thông số kỹ thuật
- **Tiến độ dự án**: 
  - Ngày khởi công
  - Ngày hoàn thành
  - Ngày bàn giao
  - Progress bar hiển thị tiến độ
- **Pháp lý**: Loại hình sở hữu và mô tả

#### Tab Mặt Bằng
- Hình ảnh mặt bằng tổng thể
- Mô tả chi tiết về layout

#### Tab Vị Trí
- **Google Maps**: Bản đồ tích hợp
- **Tiện ích lân cận**: Grid hiển thị các địa điểm quan trọng gần dự án

#### Tab Ước Tính Khoản Vay
- Công cụ tính toán (đang phát triển)

### 5. Sidebar

#### Box Thông Tin Liên Hệ
- Hotline
- Email
- Website
- Nút "Liên hệ tư vấn"

#### Box Tin Tức Dự Án
- Danh sách tin tức liên quan đến dự án
- Hình ảnh thumbnail
- Ngày đăng

#### Box Thống Kê
- Lượt xem
- Lượt quan tâm

## Cấu Trúc File

```
client/src/pages/
├── ProjectDetail.jsx    # Component chính
└── ProjectDetail.css    # Styles
```

## API Endpoint

```
GET /api/projects/:id
```

Trả về thông tin chi tiết của dự án bao gồm:
- Thông tin cơ bản
- Hình ảnh
- Tiện ích
- Chính sách bán hàng
- Tin tức
- Vị trí và tiện ích lân cận

## Responsive Design

- **Desktop**: Layout 2 cột (content + sidebar)
- **Tablet**: Layout 1 cột, gallery grid điều chỉnh
- **Mobile**: Tối ưu cho màn hình nhỏ, navigation tabs có thể scroll ngang

## Tính Năng Nổi Bật

1. **Sticky Navigation**: Tabs cố định khi scroll để dễ dàng chuyển đổi
2. **Image Gallery**: Xem trước nhiều hình ảnh với thumbnail
3. **Progress Bar**: Hiển thị trực quan tiến độ dự án
4. **Google Maps Integration**: Xem vị trí dự án trên bản đồ
5. **Responsive**: Tương thích mọi thiết bị

## Cách Sử Dụng

1. Từ trang danh sách dự án, click vào một dự án
2. URL sẽ là: `/projects/:id` (id là MongoDB _id)
3. Trang sẽ tự động load dữ liệu từ API
4. Sử dụng tabs để xem các thông tin khác nhau
5. Click vào thumbnail để xem hình ảnh khác

## Tùy Chỉnh

### Thêm Tab Mới
Trong `ProjectDetail.jsx`, thêm button mới vào `.nav-tabs` và section tương ứng trong content.

### Thay Đổi Layout
Chỉnh sửa grid trong `.content-layout` tại `ProjectDetail.css`:
```css
.content-layout {
    grid-template-columns: 1fr 380px; /* Điều chỉnh tỷ lệ */
}
```

### Thêm Tiện Ích Mới
Cập nhật mảng `utilities` trong database với icon và category phù hợp.

## Lưu Ý

- Đảm bảo dữ liệu dự án có đầy đủ các trường cần thiết
- Hình ảnh nên có kích thước phù hợp (khuyến nghị 1200x800px)
- Google Maps cần coordinates (lat, lng) chính xác
- Kiểm tra responsive trên nhiều thiết bị

## Cập Nhật Trong Tương Lai

- [ ] Công cụ tính toán khoản vay
- [ ] Lightbox cho gallery
- [ ] Chia sẻ lên mạng xã hội
- [ ] Bình luận và đánh giá
- [ ] So sánh dự án
- [ ] Lưu dự án yêu thích
- [ ] In thông tin dự án
- [ ] Video tour 360°
