# Hướng Dẫn Tính Năng Bản Đồ

## Tổng Quan

Đã thêm tính năng hiển thị bản đồ Google Maps vào trang chi tiết bất động sản, giúp người dùng xem vị trí chính xác của BDS.

## Tính Năng Đã Thêm

### 1. Model Property

Đã thêm trường `coordinates` vào schema:

```javascript
coordinates: {
    lat: Number,  // Vĩ độ
    lng: Number   // Kinh độ
}
```

### 2. Trang Chi Tiết (PropertyDetail)

**Phần "Xem trên bản đồ":**
- Hiển thị tọa độ chính xác (vĩ độ, kinh độ)
- Link "Xem bản đồ lớn hơn" mở Google Maps trong tab mới
- Google Maps embed hiển thị vị trí trên bản đồ
- Zoom level 16 để xem chi tiết khu vực

**Giao diện:**
- Tọa độ với icon định vị
- Link màu xanh có hover effect
- Bản đồ trong khung bo tròn với shadow
- Responsive design

### 3. Các Trang Danh Sách

Đã cập nhật nút "Xem bản đồ" trên:
- PropertyList
- ForSale (Nhà đất bán)
- ForRent (Nhà đất cho thuê)

*Lưu ý: Chức năng xem bản đồ danh sách đang được phát triển*

## Dữ Liệu Mẫu

### Biệt thự Ciputra - Hà Nội
```javascript
coordinates: {
    lat: 21.0745,
    lng: 105.8102
}
```
Vị trí: Khu đô thị Nam Thăng Long, Tây Hồ, Hà Nội

### Vinhomes Central Park - TP.HCM
```javascript
coordinates: {
    lat: 10.7943,
    lng: 106.7212
}
```
Vị trí: 208 Nguyễn Hữu Cảnh, Bình Thạnh, TP. Hồ Chí Minh

## Cách Sử Dụng

### 1. Xem Bản Đồ Trên Trang Chi Tiết

1. Truy cập trang chi tiết bất động sản
2. Cuộn xuống phần "Xem trên bản đồ"
3. Xem tọa độ và bản đồ nhúng
4. Click "Xem bản đồ lớn hơn" để mở Google Maps

### 2. Thêm Tọa Độ Cho BDS Mới

```javascript
{
    title: 'Tên BDS',
    // ... các trường khác
    coordinates: {
        lat: 21.0278,  // Vĩ độ
        lng: 105.8342  // Kinh độ
    }
}
```

### 3. Lấy Tọa Độ Từ Google Maps

**Cách 1: Từ Google Maps Web**
1. Mở https://www.google.com/maps
2. Tìm địa chỉ
3. Click chuột phải vào vị trí
4. Click vào tọa độ để copy (ví dụ: 21.0278, 105.8342)

**Cách 2: Từ URL**
1. Mở Google Maps
2. Tìm địa chỉ
3. Xem URL: `.../@21.0278,105.8342,...`
4. Lấy 2 số đầu tiên

**Cách 3: Từ Share Link**
1. Click nút "Share" trên Google Maps
2. Copy link
3. Tọa độ nằm trong URL

## Google Maps API

### API Key Hiện Tại

```
AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8
```

*Lưu ý: Đây là API key demo, nên thay thế bằng key riêng của bạn*

### Cách Lấy API Key Mới

1. Truy cập: https://console.cloud.google.com/
2. Tạo project mới hoặc chọn project có sẵn
3. Vào "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "API Key"
5. Enable "Maps Embed API"
6. Thêm domain restrictions (khuyến nghị)

### Cập Nhật API Key

Thay đổi trong file `client/src/pages/PropertyDetail.jsx`:

```javascript
src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${lat},${lng}&zoom=16`}
```

## Tính Năng Đã Hoàn Thành

### 1. Xem Bản Đồ Danh Sách ✅
- Component MapView hiển thị tất cả BDS trên bản đồ
- Sidebar danh sách BDS có tọa độ
- Click vào BDS để highlight và xem popup
- Popup hiển thị thông tin chi tiết
- Nút "Xem chi tiết" chuyển đến trang detail
- Responsive design cho mobile

**Cách sử dụng:**
1. Vào trang Nhà đất bán / Cho thuê / Danh sách
2. Click nút "Xem bản đồ"
3. Xem danh sách BDS bên trái
4. Click vào BDS để xem popup trên bản đồ
5. Click "Xem chi tiết" để xem trang detail
6. Click X để đóng bản đồ

## Tính Năng Nâng Cao (Tương Lai)

### 1. Markers Tùy Chỉnh
- Markers với giá và ảnh thumbnail
- Clustering khi zoom out
- Filter theo khu vực trên bản đồ

### 2. Tìm Kiếm Theo Bán Kính
- Chọn điểm trên bản đồ
- Tìm BDS trong bán kính X km
- Hiển thị khoảng cách từ điểm đã chọn

### 3. Chỉ Đường
- Tích hợp Google Directions API
- Tính khoảng cách và thời gian di chuyển
- Nhiều phương tiện: xe hơi, xe máy, đi bộ

### 4. Street View
- Xem ảnh thực tế đường phố
- 360° view xung quanh BDS

### 5. Tiện Ích Xung Quanh
- Hiển thị trường học, bệnh viện, siêu thị gần đó
- Tính khoảng cách đến các tiện ích
- Filter theo loại tiện ích

## CSS Classes

```css
.map-section          /* Container chính */
.map-info             /* Wrapper cho thông tin và bản đồ */
.map-coordinates      /* Phần hiển thị tọa độ */
.coordinates-text     /* Text tọa độ */
.view-larger-map      /* Link xem bản đồ lớn */
.map-container        /* Container cho iframe */
```

## Responsive Design

- Desktop: Bản đồ 400px height
- Tablet: Tự động điều chỉnh width
- Mobile: Full width, 300px height

## Troubleshooting

### Bản đồ không hiển thị

**Nguyên nhân:**
1. API key không hợp lệ
2. API chưa được enable
3. Domain không được phép
4. Tọa độ không hợp lệ

**Giải pháp:**
1. Kiểm tra API key
2. Enable "Maps Embed API" trong Google Cloud Console
3. Thêm domain vào whitelist
4. Kiểm tra format tọa độ (lat, lng)

### Bản đồ hiển thị sai vị trí

**Nguyên nhân:**
- Tọa độ bị nhầm (lat/lng đảo ngược)
- Tọa độ không chính xác

**Giải pháp:**
- Đảm bảo lat (vĩ độ) đứng trước lng (kinh độ)
- Kiểm tra lại tọa độ trên Google Maps

### Link "Xem bản đồ lớn hơn" không hoạt động

**Nguyên nhân:**
- Popup blocker chặn tab mới

**Giải pháp:**
- Cho phép popup từ website
- Sử dụng `target="_blank"` và `rel="noopener noreferrer"`

## Best Practices

1. **Luôn có tọa độ chính xác** - Kiểm tra kỹ trước khi lưu
2. **Sử dụng API key riêng** - Không dùng chung API key demo
3. **Thêm domain restrictions** - Bảo vệ API key
4. **Cache bản đồ** - Giảm số lượng request
5. **Lazy load** - Chỉ load bản đồ khi cần
6. **Fallback** - Hiển thị link Google Maps nếu embed fail

## Ví Dụ Tọa Độ Các Thành Phố

```javascript
// Hà Nội
{ lat: 21.0285, lng: 105.8542 }

// TP. Hồ Chí Minh
{ lat: 10.8231, lng: 106.6297 }

// Đà Nẵng
{ lat: 16.0544, lng: 108.2022 }

// Cần Thơ
{ lat: 10.0452, lng: 105.7469 }

// Hải Phòng
{ lat: 20.8449, lng: 106.6881 }
```

## Cập Nhật Dữ Liệu

Sau khi thêm tọa độ vào dữ liệu:

```bash
cd server
npm run seed
```

Sau đó restart server và refresh trang web.

## Kết Luận

Tính năng bản đồ giúp:
- ✅ Người dùng xem vị trí chính xác
- ✅ Đánh giá khu vực xung quanh
- ✅ Tính khoảng cách đến các địa điểm quan trọng
- ✅ Tăng độ tin cậy của tin đăng
- ✅ Cải thiện trải nghiệm người dùng
