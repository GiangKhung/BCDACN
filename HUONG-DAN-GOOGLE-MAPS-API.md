# Hướng Dẫn Cấu Hình Google Maps API

## 📋 Tổng Quan

Để sử dụng chức năng bản đồ trong trang đăng tin, bạn cần có Google Maps API Key. Hướng dẫn này sẽ giúp bạn tạo và cấu hình API key.

## 🔑 Tạo Google Maps API Key

### Bước 1: Truy Cập Google Cloud Console

1. Truy cập: https://console.cloud.google.com/
2. Đăng nhập bằng tài khoản Google của bạn

### Bước 2: Tạo Project Mới

1. Nhấn vào dropdown "Select a project" ở góc trên bên trái
2. Nhấn "NEW PROJECT"
3. Đặt tên project: "Batdongsan Website"
4. Nhấn "CREATE"

### Bước 3: Enable APIs

1. Vào menu ☰ → "APIs & Services" → "Library"
2. Tìm và enable các API sau:
   - **Maps JavaScript API** (bắt buộc)
   - **Geocoding API** (bắt buộc)
   - **Places API** (tùy chọn)

### Bước 4: Tạo API Key

1. Vào menu ☰ → "APIs & Services" → "Credentials"
2. Nhấn "+ CREATE CREDENTIALS" → "API key"
3. Copy API key được tạo ra
4. Nhấn "RESTRICT KEY" để bảo mật

### Bước 5: Restrict API Key (Quan Trọng!)

**Application restrictions:**
- Chọn "HTTP referrers (web sites)"
- Thêm domain của bạn:
  ```
  http://localhost:3000/*
  http://localhost:5173/*
  https://yourdomain.com/*
  ```

**API restrictions:**
- Chọn "Restrict key"
- Chọn các API đã enable:
  - Maps JavaScript API
  - Geocoding API
  - Places API

Nhấn "SAVE"

## 🔧 Cấu Hình Trong Code

### Cách 1: Thay Thế Trực Tiếp

Mở file `client/src/components/GoogleMapPicker.jsx`:

```javascript
// Tìm dòng này:
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`

// Thay YOUR_API_KEY bằng API key của bạn:
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBxxxxxxxxxxxxxxxxxxxxxx&libraries=places`
```

### Cách 2: Sử Dụng Environment Variable (Khuyến Nghị)

**1. Tạo file `.env` trong thư mục `client`:**

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxx
```

**2. Cập nhật `GoogleMapPicker.jsx`:**

```javascript
script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`
```

**3. Thêm `.env` vào `.gitignore`:**

```
# Environment variables
.env
.env.local
```

## 💰 Chi Phí

### Free Tier

Google Maps cung cấp $200 credit miễn phí mỗi tháng, đủ cho:
- **Maps JavaScript API:** ~28,000 lượt tải bản đồ
- **Geocoding API:** ~40,000 requests
- **Places API:** ~17,000 requests

### Tính Phí

Chỉ tính phí khi vượt quá $200 credit miễn phí:
- Maps JavaScript API: $7 / 1,000 lượt tải
- Geocoding API: $5 / 1,000 requests
- Places API: $17 / 1,000 requests

### Giới Hạn Sử Dụng

Để tránh chi phí không mong muốn:

1. Vào "APIs & Services" → "Quotas"
2. Đặt giới hạn cho mỗi API
3. Thiết lập budget alerts

## 🔒 Bảo Mật API Key

### ✅ Nên Làm

- Restrict API key theo domain
- Restrict API key theo API cụ thể
- Sử dụng environment variables
- Không commit API key vào Git
- Tạo API key riêng cho dev và production
- Monitor usage thường xuyên

### ❌ Không Nên

- Hardcode API key trong code
- Share API key công khai
- Sử dụng API key không có restrictions
- Commit .env file vào Git

## 🧪 Kiểm Tra API Key

### Test Trong Browser Console

```javascript
// Mở browser console (F12) và chạy:
fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=Ho+Chi+Minh+City&key=YOUR_API_KEY`)
  .then(res => res.json())
  .then(data => console.log(data))
```

Nếu thành công, bạn sẽ thấy kết quả geocoding.

### Test Trong Ứng Dụng

1. Chạy ứng dụng: `npm run dev`
2. Vào trang đăng tin: http://localhost:5173/post-property
3. Điền thông tin đến Bước 3
4. Kiểm tra bản đồ có hiển thị không
5. Thử tìm kiếm địa chỉ

## ❗ Xử Lý Lỗi Thường Gặp

### Lỗi: "This page can't load Google Maps correctly"

**Nguyên nhân:**
- API key không hợp lệ
- API chưa được enable
- Billing chưa được setup

**Giải pháp:**
1. Kiểm tra API key đã copy đúng chưa
2. Enable Maps JavaScript API
3. Setup billing account (không tính phí nếu dưới $200/tháng)

### Lỗi: "RefererNotAllowedMapError"

**Nguyên nhân:**
- Domain không được phép trong API restrictions

**Giải pháp:**
1. Vào Credentials → Edit API key
2. Thêm domain vào HTTP referrers:
   ```
   http://localhost:*/*
   https://yourdomain.com/*
   ```

### Lỗi: "ApiNotActivatedMapError"

**Nguyên nhân:**
- API chưa được enable

**Giải pháp:**
1. Vào APIs & Services → Library
2. Tìm và enable:
   - Maps JavaScript API
   - Geocoding API

### Lỗi: Bản đồ hiển thị màu xám

**Nguyên nhân:**
- API key không có quyền truy cập
- Billing chưa setup

**Giải pháp:**
1. Setup billing account
2. Kiểm tra API restrictions
3. Xóa cache browser và reload

## 🌐 Alternative: Sử Dụng Bản Đồ Miễn Phí

Nếu không muốn sử dụng Google Maps, bạn có thể dùng:

### OpenStreetMap + Leaflet

**Ưu điểm:**
- Hoàn toàn miễn phí
- Không cần API key
- Open source

**Nhược điểm:**
- Ít tính năng hơn Google Maps
- Dữ liệu có thể không đầy đủ ở một số khu vực

### Mapbox

**Ưu điểm:**
- Giao diện đẹp
- 50,000 lượt tải miễn phí/tháng
- Nhiều tính năng

**Nhược điểm:**
- Cần đăng ký API key
- Tính phí khi vượt quota

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra Google Cloud Console logs
2. Xem browser console (F12) để biết lỗi chi tiết
3. Tham khảo: https://developers.google.com/maps/documentation

## 📝 Checklist

- [ ] Tạo Google Cloud project
- [ ] Enable Maps JavaScript API
- [ ] Enable Geocoding API
- [ ] Tạo API key
- [ ] Restrict API key theo domain
- [ ] Restrict API key theo API
- [ ] Setup billing account
- [ ] Thêm API key vào code
- [ ] Test trong ứng dụng
- [ ] Thêm .env vào .gitignore
- [ ] Setup budget alerts

## 🎓 Tài Liệu Tham Khảo

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Geocoding API](https://developers.google.com/maps/documentation/geocoding)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)
