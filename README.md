# 🏠 Website Bất Động Sản với AI

Ứng dụng web mua bán, cho thuê bất động sản được xây dựng với ReactJS, NodeJS và MongoDB, tích hợp AI để nâng cao trải nghiệm người dùng.

![Real Estate](https://img.shields.io/badge/Real%20Estate-Platform-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248)
![AI Powered](https://img.shields.io/badge/AI-Gemini-8E44AD)

## ✨ Tính năng chính

### 🏡 Quản lý Bất Động Sản
- Đăng tin bán/cho thuê bất động sản
- Tìm kiếm & lọc theo nhiều tiêu chí (giá, diện tích, khu vực, loại BĐS)
- Xem chi tiết BĐS với hình ảnh, bản đồ vị trí
- Lưu tin yêu thích

### 🤖 Tính năng AI (Mới)
- **AI Chatbot**: Trợ lý tư vấn bất động sản thông minh, tích hợp Gemini AI
- **Dự đoán giá**: Ước tính giá BĐS dựa trên phân tích thống kê thị trường
- **Gợi ý thông minh**: Hệ thống recommend dựa trên lịch sử xem và tìm kiếm

### 💳 Thanh toán & Quản lý
- Tích hợp SePay cho thanh toán QR Code
- Quản lý tin đăng với các gói VIP
- Hệ thống thông báo hết hạn tự động

### 👥 Tài khoản & Xác thực
- Đăng nhập/đăng ký thông thường
- Đăng nhập với Google OAuth
- Phân quyền User/Admin

## 🛠 Công nghệ sử dụng

| Layer | Công nghệ |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router, Axios |
| **Backend** | Node.js, Express.js, JWT |
| **Database** | MongoDB Atlas, Mongoose |
| **AI** | Google Gemini API |
| **Payment** | SePay API |
| **Auth** | Google OAuth 2.0 |
| **Container** | Docker, Docker Compose |

## 📦 Cài đặt

### Yêu cầu
- Node.js 18+ 
- MongoDB Atlas account (hoặc MongoDB local)
- Gemini API key (tùy chọn, cho AI Chatbot)

### 1. Clone repository
```bash
git clone https://github.com/your-username/BCDACN.git
cd BCDACN
```

### 2. Cài đặt dependencies
```bash
# Frontend
cd client && npm install

# Backend
cd ../server && npm install
```

### 3. Cấu hình môi trường
```bash
# Copy file mẫu
cp server/.env.example server/.env

# Chỉnh sửa các biến môi trường
```

**Các biến cần thiết:**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# (Tùy chọn) Gemini AI - Lấy tại: https://aistudio.google.com/apikey
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Chạy ứng dụng

**Development:**
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend  
cd client && npm run dev
```

**Docker (Production):**
```bash
docker-compose up -d
```

## 🌐 Truy cập

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API Documentation | http://localhost:5000/api |

## 📁 Cấu trúc project

```
BCDACN/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components
│   │   │   ├── ChatBot.jsx        # AI Chatbot
│   │   │   ├── PricePrediction.jsx # Dự đoán giá
│   │   │   └── RecommendedProperties.jsx
│   │   ├── pages/          # Trang chính
│   │   └── App.jsx
│   └── package.json
├── server/                 # Node.js Backend
│   ├── routes/
│   │   ├── chatbot.js      # API AI Chatbot
│   │   ├── pricePredict.js # API Dự đoán giá
│   │   ├── recommendations.js
│   │   └── properties.js
│   ├── models/
│   ├── middleware/
│   └── index.js
├── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

### Properties
- `GET /api/properties` - Lấy danh sách BĐS
- `POST /api/properties` - Đăng tin mới
- `GET /api/properties/:id` - Chi tiết BĐS

### AI Features
- `POST /api/chatbot/message` - Chat với AI
- `GET /api/chatbot/suggestions` - Gợi ý câu hỏi
- `POST /api/price-predict` - Dự đoán giá BĐS
- `GET /api/recommendations` - Gợi ý BĐS cá nhân hóa

### User
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/google` - Đăng nhập Google

## 📸 Screenshots

*Coming soon...*

## 🤝 Đóng góp

1. Fork repository
2. Tạo branch: `git checkout -b feature/AmazingFeature`
3. Commit: `git commit -m 'Add AmazingFeature'`
4. Push: `git push origin feature/AmazingFeature`
5. Tạo Pull Request

## 📝 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👨‍💻 Tác giả

- **Sinh viên** - Đại học Trà Vinh
- Bộ môn: Bán bất động sản online (BCDACN)

---

⭐ **Nếu thấy hữu ích, hãy cho project một star!** ⭐
