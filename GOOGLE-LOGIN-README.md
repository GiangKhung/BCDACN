# 🚀 Chức Năng Đăng Nhập Bằng Google

## ✅ Đã Hoàn Thành

Chức năng đăng nhập bằng Google OAuth 2.0 đã được tích hợp hoàn chỉnh vào ứng dụng bất động sản.

---

## 📦 Các File Đã Tạo/Cập Nhật

### Backend (Server)

1. **`server/config/passport.js`** - Cấu hình Passport Google OAuth Strategy
2. **`server/routes/auth.js`** - Thêm routes Google OAuth
3. **`server/models/User.js`** - Cập nhật schema hỗ trợ Google login
4. **`server/index.js`** - Initialize Passport middleware
5. **`server/.env.example`** - Template environment variables

### Frontend (Client)

1. **`client/src/components/GoogleLoginButton.jsx`** - Component Google Login
2. **`client/src/components/GoogleLoginButton.css`** - Styles cho Google button
3. **`client/src/pages/GoogleAuthSuccess.jsx`** - Xử lý OAuth callback
4. **`client/src/pages/Login.jsx`** - Tích hợp Google Login button
5. **`client/src/pages/Register.jsx`** - Tích hợp Google Login button
6. **`client/src/App.jsx`** - Thêm GoogleOAuthProvider và routes
7. **`client/.env.example`** - Template environment variables

### Documentation & Testing

1. **`GOOGLE-OAUTH-SETUP.md`** - Hướng dẫn chi tiết setup Google OAuth
2. **`test-google-oauth.html`** - File test Google OAuth flow
3. **`GOOGLE-LOGIN-README.md`** - File này

---

## 🔧 Dependencies Đã Cài Đặt

### Backend
```bash
npm install passport passport-google-oauth20 google-auth-library
```

### Frontend
```bash
npm install @react-oauth/google
```

---

## ⚙️ Cấu Hình Cần Thiết

### 1. Google Cloud Console

Tạo OAuth 2.0 credentials tại [Google Cloud Console](https://console.cloud.google.com/)

**Authorized JavaScript origins:**
- `http://localhost:3000`
- `http://localhost:5000`

**Authorized redirect URIs:**
- `http://localhost:5000/api/auth/google/callback`
- `http://localhost:3000/auth/google/success`

### 2. Environment Variables

**`server/.env`:**
```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret
MONGODB_URI=your-mongodb-uri
```

**`client/.env.local`:**
```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_API_URL=http://localhost:5000
```

---

## 🎯 Tính Năng

### ✅ Đã Implement

1. **Google OAuth 2.0 Integration**
   - Server-side OAuth flow
   - Client-side token verification
   - Passport.js strategy

2. **User Management**
   - Tự động tạo user mới từ Google account
   - Link Google account với existing email
   - Lưu Google ID và avatar
   - Auto-verify email cho Google users

3. **JWT Authentication**
   - Generate JWT token sau khi đăng nhập Google
   - Token-based authentication
   - Persistent login

4. **UI Components**
   - Google Login button với official Google design
   - One-Tap sign-in support
   - Responsive design
   - Error handling

5. **Security**
   - Token verification với Google
   - Secure password handling
   - CORS configuration
   - Environment variables protection

---

## 🔄 Luồng Hoạt Động

### Method 1: Client-side Token Verify (Recommended)

```
1. User clicks "Đăng nhập với Google"
2. Google One Tap popup xuất hiện
3. User chọn tài khoản Google
4. Frontend nhận credential token từ Google
5. Frontend gửi token đến: POST /api/auth/google/verify
6. Backend verify token với Google API
7. Backend tạo/cập nhật user trong database
8. Backend trả về JWT token
9. Frontend lưu token và user info
10. User được redirect về trang chủ
```

### Method 2: Server-side OAuth Flow

```
1. User clicks "Đăng nhập với Google"
2. Frontend redirect đến: GET /api/auth/google
3. Backend redirect đến Google OAuth
4. User authorize trên Google
5. Google redirect về: GET /api/auth/google/callback
6. Backend tạo/cập nhật user
7. Backend generate JWT token
8. Backend redirect về: /auth/google/success?token=xxx
9. Frontend lưu token và user info
10. User được redirect về trang chủ
```

---

## 🧪 Testing

### 1. Sử dụng Test File

Mở file `test-google-oauth.html` trong browser:
```bash
# Mở trực tiếp file hoặc
python -m http.server 8000
# Sau đó mở: http://localhost:8000/test-google-oauth.html
```

### 2. Test Trên Ứng Dụng

1. Start backend:
```bash
cd server
npm run dev
```

2. Start frontend:
```bash
cd client
npm run dev
```

3. Mở browser: `http://localhost:3000/login`
4. Click "Đăng nhập với Google"
5. Chọn tài khoản Google
6. Verify đăng nhập thành công

### 3. Test API Endpoints

```bash
# Test Google OAuth initiation
curl http://localhost:5000/api/auth/google

# Test token verify (cần real Google token)
curl -X POST http://localhost:5000/api/auth/google/verify \
  -H "Content-Type: application/json" \
  -d '{"credential": "google-id-token"}'

# Test get user info
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer your-jwt-token"
```

---

## 📊 Database Schema

User model đã được cập nhật:

```javascript
{
  name: String,
  email: String,
  password: String,              // Optional cho Google users
  googleId: String,              // Google user ID
  authProvider: String,          // 'local' hoặc 'google'
  avatar: String,                // Google profile picture
  isVerified: Boolean,           // Auto true cho Google users
  role: String,
  savedProperties: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Features

1. **Token Verification**: Verify Google token với Google API
2. **JWT Authentication**: Secure token-based auth
3. **Password Optional**: Google users không cần password
4. **Email Verification**: Auto-verify cho Google users
5. **CORS Protection**: Configured CORS policies
6. **Environment Variables**: Sensitive data trong .env

---

## 🚀 Deployment

### Production Setup

1. **Update Google Console:**
   - Thêm production domain vào Authorized domains
   - Thêm production URLs vào redirect URIs

2. **Update Environment Variables:**
```env
# Production
GOOGLE_CALLBACK_URL=https://api.yourdomain.com/api/auth/google/callback
CLIENT_URL=https://yourdomain.com
```

3. **Enable HTTPS:**
   - Google OAuth yêu cầu HTTPS trong production
   - Setup SSL certificate

---

## 📚 Tài Liệu

- **Setup Guide**: `GOOGLE-OAUTH-SETUP.md` - Hướng dẫn chi tiết
- **Test File**: `test-google-oauth.html` - Test OAuth flow
- **API Docs**: Xem routes trong `server/routes/auth.js`

---

## 🐛 Troubleshooting

### Lỗi thường gặp:

1. **"redirect_uri_mismatch"**
   - Kiểm tra redirect URI trong Google Console
   - Đảm bảo URL chính xác 100%

2. **"Invalid token"**
   - Verify GOOGLE_CLIENT_ID trong .env
   - Check token expiration

3. **User không được tạo**
   - Check MongoDB connection
   - Xem server logs
   - Verify User model schema

4. **CORS errors**
   - Verify CLIENT_URL trong .env
   - Check CORS configuration

Xem thêm trong `GOOGLE-OAUTH-SETUP.md` phần Troubleshooting.

---

## ✨ Next Steps

### Có thể mở rộng:

1. **Facebook Login** - Tương tự Google OAuth
2. **Apple Sign In** - Cho iOS users
3. **Two-Factor Authentication** - Tăng security
4. **Email Verification** - Cho local auth
5. **Password Reset** - Forgot password flow
6. **Social Profile Sync** - Sync thêm info từ Google

---

## 📞 Support

Nếu gặp vấn đề:
1. Đọc `GOOGLE-OAUTH-SETUP.md`
2. Check server logs
3. Test với `test-google-oauth.html`
4. Verify environment variables
5. Check Google Console configuration

---

## ✅ Checklist Hoàn Thành

- [x] Install dependencies (passport, @react-oauth/google)
- [x] Create Passport Google Strategy
- [x] Add Google OAuth routes
- [x] Update User model
- [x] Create GoogleLoginButton component
- [x] Integrate Google button vào Login/Register
- [x] Add GoogleOAuthProvider wrapper
- [x] Create OAuth success handler
- [x] Add environment variables
- [x] Create documentation
- [x] Create test file
- [ ] Setup Google Cloud Project (User cần làm)
- [ ] Configure OAuth consent screen (User cần làm)
- [ ] Get Client ID and Secret (User cần làm)
- [ ] Update .env files (User cần làm)
- [ ] Test đăng nhập Google (User cần làm)

---

**Lưu ý**: Để sử dụng chức năng này, bạn cần:
1. Tạo Google Cloud Project
2. Lấy Client ID và Client Secret
3. Cập nhật file .env
4. Test đăng nhập

Xem hướng dẫn chi tiết trong `GOOGLE-OAUTH-SETUP.md`
