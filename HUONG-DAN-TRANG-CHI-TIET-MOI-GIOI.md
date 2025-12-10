# Hướng Dẫn Trang Chi Tiết Nhà Môi Giới

## Tổng Quan

Trang chi tiết nhà môi giới hiển thị đầy đủ thông tin về công ty hoặc cá nhân môi giới bất động sản, bao gồm:
- Thông tin công ty/cá nhân
- Danh sách tin đăng
- Khu vực hoạt động
- Đánh giá từ khách hàng

## Cấu Trúc Trang

### 1. Header Section (Phần Đầu)

**Thông tin hiển thị:**
- Logo công ty (150x150px)
- Tên công ty/cá nhân
- Badge xác thực (nếu có)
- Địa chỉ văn phòng
- Thống kê:
  - Số lượng tin đăng
  - Số năm kinh nghiệm
  - Điểm đánh giá

**Nút hành động:**
- Gọi điện thoại (hiển thị số điện thoại)
- Gửi email

### 2. Tabs Navigation (Menu Tab)

**4 tab chính:**

#### Tab 1: Giới Thiệu
- Mô tả về công ty/cá nhân
- Danh sách dịch vụ cung cấp
- Chuyên môn/lĩnh vực hoạt động
- Thông tin liên hệ chi tiết
- Link website (nếu có)

#### Tab 2: Tin Đăng
- Hiển thị grid các tin đăng của môi giới
- Mỗi card tin đăng bao gồm:
  - Hình ảnh
  - Tiêu đề
  - Giá
  - Vị trí
- Click vào card để xem chi tiết tin đăng

#### Tab 3: Khu Vực Hoạt Động
- Danh sách các khu vực môi giới đang hoạt động
- Hiển thị dạng grid với icon vị trí
- Ví dụ: "Bán nhà mặt phố ở Đà Lạt, Lâm Đồng"

#### Tab 4: Đánh Giá
- Tổng quan điểm đánh giá
- Số sao đánh giá
- Số lượng đánh giá
- Danh sách đánh giá từ khách hàng (đang phát triển)

### 3. Sidebar (Thanh Bên)

**Thông tin liên hệ:**
- Điện thoại
- Email
- Địa chỉ

**Website:**
- Nút truy cập website (nếu có)

## Dữ Liệu Mock

### Công Ty Môi Giới (ID: 1-5)

Hiện tại có 5 công ty mẫu:

1. **Victory Real Estate**
   - ID: 1
   - Kinh nghiệm: 10 năm
   - Đánh giá: 4.8/5
   - Tin đăng: 156

2. **Hoàng Quân Real Estate**
   - ID: 2
   - Kinh nghiệm: 8 năm
   - Đánh giá: 4.6/5
   - Tin đăng: 89

3. **Khang Điền Nam**
   - ID: 3
   - Kinh nghiệm: 15 năm
   - Đánh giá: 4.9/5
   - Tin đăng: 203

4. **Phú Thanh T&T**
   - ID: 4
   - Kinh nghiệm: 12 năm
   - Đánh giá: 4.7/5
   - Tin đăng: 134

5. **Minh Nhật**
   - ID: 5
   - Kinh nghiệm: 18 năm
   - Đánh giá: 4.8/5
   - Tin đăng: 278

### Cá Nhân Môi Giới (ID: 101-106)

Hiện tại có 6 cá nhân mẫu:

1. **Phạm Công Tín**
   - ID: 101
   - Địa chỉ: Lý Nam Đế, Đà Lạt
   - Kinh nghiệm: 7 năm
   - Đánh giá: 4.7/5
   - Tin đăng: 45

2. **Trương Hoàng Giang**
   - ID: 102
   - Địa chỉ: Nguyễn Từ Lực, Đà Lạt
   - Kinh nghiệm: 6 năm
   - Đánh giá: 4.6/5
   - Tin đăng: 38

3. **Lương Quốc Anh**
   - ID: 103
   - Địa chỉ: Phan Chu Trinh, Đà Lạt
   - Kinh nghiệm: 8 năm
   - Đánh giá: 4.8/5
   - Tin đăng: 52

4. **Lý Văn Thịnh**
   - ID: 104
   - Địa chỉ: Thái Phiên, Đà Lạt
   - Kinh nghiệm: 5 năm
   - Đánh giá: 4.5/5
   - Tin đăng: 41

5. **Trần Vĩ Nhân**
   - ID: 105
   - Địa chỉ: Hoàng Văn Thụ, Quận 1, HCM
   - Kinh nghiệm: 9 năm
   - Đánh giá: 4.9/5
   - Tin đăng: 67

6. **Trần Ngọc Mơ**
   - ID: 106
   - Địa chỉ: Nguyễn Huệ, Quận 1, HCM
   - Kinh nghiệm: 7 năm
   - Đánh giá: 4.7/5
   - Tin đăng: 55

## Tính Năng

### 1. Breadcrumb Navigation
```
Trang chủ / Danh bạ môi giới / [Tên công ty]
```

### 2. Responsive Design
- Desktop: Layout 2 cột (main + sidebar)
- Tablet/Mobile: Layout 1 cột

### 3. Loading State
- Hiển thị spinner khi đang tải dữ liệu
- Thông báo lỗi nếu không tìm thấy

### 4. Interactive Elements
- Hover effects trên các nút
- Smooth transitions
- Active state cho tabs

## URL Structure

```
/agent/:id
```

Ví dụ công ty:
- `/agent/1` - Victory Real Estate
- `/agent/2` - Hoàng Quân Real Estate
- `/agent/3` - Khang Điền Nam

Ví dụ cá nhân:
- `/agent/101` - Phạm Công Tín
- `/agent/102` - Trương Hoàng Giang
- `/agent/103` - Lương Quốc Anh
- `/agent/3` - Khang Điền Nam

## API Endpoints (Dự Kiến)

### Lấy thông tin môi giới
```
GET /api/agents/:id
```

Response:
```json
{
  "id": 1,
  "name": "Công ty ABC",
  "logo": "/images/companies/abc.png",
  "address": "123 Đường XYZ",
  "phone": "0901234567",
  "email": "contact@abc.com",
  "website": "https://abc.com",
  "verified": true,
  "propertiesCount": 156,
  "yearsExperience": 10,
  "rating": 4.8,
  "reviewsCount": 234,
  "description": "Mô tả công ty...",
  "services": ["Dịch vụ 1", "Dịch vụ 2"],
  "specialties": ["Chuyên môn 1", "Chuyên môn 2"],
  "areas": ["Khu vực 1", "Khu vực 2"]
}
```

### Lấy danh sách tin đăng của môi giới
```
GET /api/properties?agentId=:id
```

Response:
```json
[
  {
    "_id": "1",
    "title": "Căn hộ cao cấp...",
    "image": "url",
    "priceText": "5.2 tỷ",
    "location": "Quận 2, HCM"
  }
]
```

## Phân Biệt Công Ty và Cá Nhân

**Công ty môi giới:**
- Logo hình vuông bo góc (border-radius: 12px)
- Hiển thị logo công ty
- ID: 1-5

**Cá nhân môi giới:**
- Avatar hình tròn (border-radius: 50%)
- Hiển thị ảnh cá nhân
- ID: 101-106
- Shadow lớn hơn cho avatar

## Styling

### Color Scheme
- Primary: `#e03e52` (đỏ)
- Secondary: `#667eea` (tím xanh)
- Success: `#10b981` (xanh lá)
- Background: `#f8f9fa` (xám nhạt)
- Text: `#2d3748` (xám đậm)

### Typography
- Heading: 28px, 700 weight
- Subheading: 20px, 700 weight
- Body: 15px, 400 weight
- Small: 13-14px

### Spacing
- Section padding: 2rem
- Card padding: 1.5-2rem
- Gap between elements: 1-2rem

## Components Sử Dụng

### AgentDetail.jsx
- Main component cho trang chi tiết
- Quản lý state và data fetching
- Render các tabs và sections

### PropertyCard
- Component con hiển thị tin đăng nhỏ
- Props: property object
- Link đến trang chi tiết tin đăng

## Cách Sử Dụng

### 1. Truy Cập Trang
- Từ trang danh bạ, click vào tên công ty hoặc logo
- Hoặc truy cập trực tiếp URL `/agent/:id`

### 2. Xem Thông Tin
- Đọc giới thiệu về công ty
- Xem danh sách tin đăng
- Kiểm tra khu vực hoạt động
- Đọc đánh giá

### 3. Liên Hệ
- Click nút "Gọi điện" để gọi
- Click "Gửi Email" để gửi email
- Click "Truy cập website" để vào website

### 4. Xem Tin Đăng
- Chuyển sang tab "Tin đăng"
- Click vào tin đăng để xem chi tiết

## Cải Tiến Trong Tương Lai

1. **Tích hợp API thực**
   - Kết nối với backend
   - Lấy dữ liệu thực từ database

2. **Hệ thống đánh giá**
   - Cho phép khách hàng đánh giá
   - Hiển thị chi tiết đánh giá

3. **Chat trực tuyến**
   - Tích hợp chat với môi giới
   - Hỗ trợ real-time

4. **Bản đồ**
   - Hiển thị vị trí văn phòng
   - Hiển thị khu vực hoạt động trên bản đồ

5. **Thống kê chi tiết**
   - Biểu đồ giao dịch
   - Lịch sử hoạt động
   - Tỷ lệ thành công

6. **Lọc và sắp xếp tin đăng**
   - Lọc theo loại BĐS
   - Sắp xếp theo giá, ngày đăng
   - Tìm kiếm trong tin đăng

7. **Chia sẻ**
   - Chia sẻ lên mạng xã hội
   - Copy link
   - QR code

## Lưu Ý Kỹ Thuật

### Performance
- Lazy load images
- Pagination cho tin đăng
- Cache dữ liệu môi giới

### SEO
- Meta tags động
- Structured data
- Canonical URLs

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support

### Security
- Validate phone/email
- Sanitize user input
- Rate limiting cho API

## Testing

### Test Cases
1. Load trang với ID hợp lệ
2. Load trang với ID không tồn tại
3. Chuyển đổi giữa các tabs
4. Click vào tin đăng
5. Click các nút liên hệ
6. Responsive trên mobile
7. Loading state
8. Error handling

## Kết Luận

Trang chi tiết nhà môi giới đã được xây dựng hoàn chỉnh với đầy đủ thông tin và tính năng cơ bản. Giao diện đẹp mắt, dễ sử dụng và responsive tốt trên mọi thiết bị.
