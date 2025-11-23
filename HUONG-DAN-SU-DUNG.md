# Trang Web Bất Động Sản - Hướng Dẫn Sử Dụng

## 🎨 Thiết Kế Hiện Đại

Trang web được thiết kế với phong cách hiện đại, bao gồm:

### ✨ Tính Năng Nổi Bật

1. **Giao diện tìm kiếm gradient đẹp mắt**
   - Background gradient tím-xanh (#667eea → #764ba2)
   - Hiệu ứng hover và transform mượt mà
   - Bộ lọc với backdrop blur hiện đại

2. **Card bất động sản cải tiến**
   - Border radius lớn (16px) cho cảm giác mềm mại
   - Hiệu ứng hover với shadow và transform
   - Zoom ảnh khi hover
   - Gradient cho giá tiền (xanh lá)
   - Icon và badge hiện đại

3. **Màu sắc và Typography**
   - Primary: #667eea (Tím)
   - Accent: #e03e52 (Đỏ)
   - Success: #16c784 (Xanh lá)
   - Font weights: 500-800 cho các heading
   - Line height tối ưu cho dễ đọc

4. **Responsive Design**
   - Tự động điều chỉnh layout trên mobile
   - Grid system linh hoạt
   - Sidebar chuyển thành accordion trên mobile

## 🚀 Cài Đặt và Chạy

### Yêu Cầu
- Node.js 16+
- npm hoặc yarn

### Cài Đặt

1. **Cài đặt dependencies cho server:**
```bash
cd server
npm install
```

2. **Cài đặt dependencies cho client:**
```bash
cd client
npm install
```

### Chạy Ứng Dụng

1. **Chạy server (Terminal 1):**
```bash
cd server
npm start
```
Server sẽ chạy tại: http://localhost:5000

2. **Chạy client (Terminal 2):**
```bash
cd client
npm run dev
```
Client sẽ chạy tại: http://localhost:5173

## 📁 Cấu Trúc Dự Án

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Components tái sử dụng
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PropertyCard.jsx
│   │   ├── pages/         # Các trang
│   │   │   ├── Home.jsx
│   │   │   ├── PropertyList.jsx
│   │   │   └── PropertyDetail.jsx
│   │   └── App.jsx
│   └── public/
│       └── images/        # Hình ảnh
│
├── server/                # Backend Node.js
│   ├── data/             # Dữ liệu mẫu
│   ├── routes/           # API routes
│   └── index.js
│
└── docker-compose.yml    # Docker configuration
```

## 🎯 Các Trang Chính

### 1. Trang Chủ (/)
- Hero section với search box
- Tin tức nổi bật
- Bất động sản dành cho bạn
- Dự án nổi bật
- Bất động sản theo địa điểm
- Tin tức và blog
- Tiện ích hỗ trợ
- Đối tác và báo chí

### 2. Danh Sách BĐS (/properties)
- Thanh tìm kiếm nâng cao
- Bộ lọc theo giá, diện tích
- Sidebar với các tùy chọn lọc
- Danh sách property cards
- Phân trang

### 3. Chi Tiết BĐS (/property/:id)
- Thông tin chi tiết
- Gallery ảnh
- Thông tin liên hệ
- Bản đồ vị trí

## 🎨 Tùy Chỉnh Màu Sắc

Để thay đổi màu sắc chính, chỉnh sửa các biến trong file CSS:

```css
/* Primary Colors */
--primary: #667eea;
--primary-dark: #764ba2;
--accent: #e03e52;
--success: #16c784;

/* Neutral Colors */
--text-primary: #1a1a1a;
--text-secondary: #4a5568;
--text-muted: #718096;
--border: #e2e8f0;
--background: #f8f9fa;
```

## 📱 Responsive Breakpoints

- Desktop: > 992px
- Tablet: 768px - 992px
- Mobile: < 768px

## 🔧 Công Nghệ Sử Dụng

### Frontend
- React 18
- React Router DOM 6
- Axios
- Vite

### Backend
- Node.js
- Express
- CORS

## 📝 Ghi Chú

- Dữ liệu hiện tại là dữ liệu mẫu (mock data)
- Để kết nối database thật, cập nhật file `server/data/properties.js`
- Hình ảnh đang sử dụng Unsplash placeholder
- Để thêm hình ảnh thật, đặt vào thư mục `client/public/images/`

## 🎯 Tính Năng Sắp Tới

- [ ] Đăng nhập/Đăng ký
- [ ] Lưu tin yêu thích
- [ ] So sánh bất động sản
- [ ] Chat với chủ nhà
- [ ] Tích hợp bản đồ Google Maps
- [ ] Tìm kiếm nâng cao với AI
- [ ] Thông báo email
- [ ] Dashboard quản lý tin đăng

## 📞 Liên Hệ

Nếu có câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ qua email hoặc tạo issue trên GitHub.

---

**Chúc bạn sử dụng vui vẻ! 🏠✨**
