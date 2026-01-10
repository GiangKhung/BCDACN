# 🔐 Hướng Dẫn Cấu Hình Google OAuth 2.0

## 📋 Tổng Quan

Tài liệu này hướng dẫn cách thiết lập đăng nhập bằng Google cho ứng dụng bất động sản.

---

## 🚀 Bước 1: Tạo Google Cloud Project

### 1.1. Truy cập Google Cloud Console

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Đăng nhập bằng tài khoản Google của bạn

### 1.2. Tạo Project Mới

1. Click vào dropdown project ở góc trên bên trái
2. Click **"New Project"**
3. Nhập thông tin:
   - **Project name**: `Real Estate App` (hoặc tên bạn muốn)
   - **Organization**: Để trống nếu không có
4. Click **"Create"**

---

## 🔑 Bước 2: Tạo OAuth 2.0 Credentials

### 2.1. Enable Google+ API

1. Trong project vừa tạo, vào **"APIs & Services"** → **"Library"**
2. Tìm **"Google+ API"** hoặc **"Google Identity"**
3. Click **"Enable"**

### 2.2. Configure OAuth Consent Screen

1. Vào **"APIs & Services"** → **"OAuth consent screen"**
   - URL trực tiếp: https://console.cloud.google.com/apis/credentials/consent
   
2. **Chọn User Type:**
   - Nếu chưa cấu hình, bạn sẽ thấy màn hình chọn User Type
   - Chọn **"External"** (cho phép bất kỳ ai có Google account đăng nhập)
   - **"Internal"** chỉ hiện nếu bạn có Google Workspace organization
   
   **Lưu ý:** Nếu không thấy màn hình này:
   - Có thể đã được cấu hình rồi
   - Hoặc click nút **"Create OAuth client"** trong trang Credentials, hệ thống sẽ yêu cầu configure consent screen
   
3. Click **"Create"** hoặc **"Configure"**

### 2.3. Điền Thông Tin OAuth Consent Screen

4. **App information:**
   - **App name**: `Real Estate App`
   - **User support email**: Email của bạn
   - **App logo**: Upload logo (optional)

5. **App domain:**
   - **Application home page**: `http://localhost:3000`
   - **Application privacy policy link**: `http://localhost:3000/privacy`
   - **Application terms of service link**: `http://localhost:3000/terms`

6. **Authorized domains:**
   - Thêm: `localhost` (cho development)
   - Thêm domain production của bạn (vd: `yourdomain.com`)

7. **Developer contact information:**
   - Email của bạn

8. Click **"Save and Continue"**

9. **Scopes:**
   - Click **"Add or Remove Scopes"**
   - Chọn:
     - `userinfo.email`
     - `userinfo.profile`
     - `openid`
   - Click **"Update"** → **"Save and Continue"**

10. **Test users** (nếu chọn External):
    - Click **"Add Users"**
    - Thêm email của bạn và team members
    - Click **"Save and Continue"**

11. Review và click **"Back to Dashboard"**

### 2.4. Tạo OAuth Client ID

1. Vào **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**

3. **Application type**: Chọn **"Web application"**

4. **Name**: `Real Estate Web Client`

5. **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   http://localhost:5000
   https://yourdomain.com (production)
   ```

6. **Authorized redirect URIs:**
   ```
   http://localhost:5000/api/auth/google/callback
   http://localhost:3000/auth/google/success
   https://yourdomain.com/api/auth/google/callback (production)
   https://yourdomain.com/auth/google/success (production)
   ```

7. Click **"Create"**

8. **Lưu thông tin:**
   - **Client ID**: `xxxxx.apps.googleusercontent.com`
   - **Client Secret**: `xxxxxx`
   
   ⚠️ **LƯU Ý**: Giữ Client Secret bí mật!

---

## ⚙️ Bước 3: Cấu Hình Backend

### 3.1. Cập nhật file `.env`

Tạo hoặc cập nhật file `server/.env`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Client URL
CLIENT_URL=http://localhost:3000

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# MongoDB
MONGODB_URI=your-mongodb-connection-string
```

### 3.2. Cài đặt dependencies

```bash
cd server
npm install passport passport-google-oauth20 google-auth-library
```

---

## 🎨 Bước 4: Cấu Hình Frontend

### 4.1. Cập nhật file `.env`

Tạo file `client/.env.local`:

```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_API_URL=http://localhost:5000
```

### 4.2. Cài đặt dependencies

```bash
cd client
npm install @react-oauth/google
```

---

## 🧪 Bước 5: Testing

### 5.1. Khởi động Backend

```bash
cd server
npm run dev
```

Server sẽ chạy tại: `http://localhost:5000`

### 5.2. Khởi động Frontend

```bash
cd client
npm run dev
```

Client sẽ chạy tại: `http://localhost:3000`

### 5.3. Test Google Login

1. Mở trình duyệt: `http://localhost:3000/login`
2. Click nút **"Đăng nhập với Google"**
3. Chọn tài khoản Google
4. Cho phép quyền truy cập
5. Kiểm tra redirect về trang chủ
6. Verify user đã đăng nhập (check Header)

---

## 🔍 Kiểm Tra API Endpoints

### Test Google OAuth Flow (Backend)

```bash
# Khởi tạo OAuth
curl http://localhost:5000/api/auth/google

# Callback (tự động redirect từ Google)
# http://localhost:5000/api/auth/google/callback?code=xxx
```

### Test Google Token Verify (Frontend method)

```bash
curl -X POST http://localhost:5000/api/auth/google/verify \
  -H "Content-Type: application/json" \
  -d '{"credential": "google-id-token"}'
```

---

## 📊 Database Schema

User model đã được cập nhật với các trường:

```javascript
{
  googleId: String,           // Google user ID
  authProvider: String,       // 'local' hoặc 'google'
  password: String,           // Optional cho Google users
  isVerified: Boolean,        // Auto true cho Google users
  // ... các trường khác
}
```

---

## 🔄 Luồng Hoạt Động

### Method 1: Server-side OAuth Flow

```
User clicks "Login with Google"
    ↓
Frontend redirects to: /api/auth/google
    ↓
Backend redirects to Google OAuth
    ↓
User authorizes on Google
    ↓
Google redirects to: /api/auth/google/callback
    ↓
Backend creates/updates user
    ↓
Backend generates JWT token
    ↓
Backend redirects to: /auth/google/success?token=xxx
    ↓
Frontend saves token and user info
    ↓
User is logged in
```

### Method 2: Client-side Token Verify (Recommended)

```
User clicks "Login with Google"
    ↓
Google One Tap appears
    ↓
User selects account
    ↓
Frontend receives credential token
    ↓
Frontend sends to: /api/auth/google/verify
    ↓
Backend verifies token with Google
    ↓
Backend creates/updates user
    ↓
Backend returns JWT token
    ↓
Frontend saves token and user info
    ↓
User is logged in
```

---

## 🛠️ Troubleshooting

### Lỗi: "redirect_uri_mismatch"

**Nguyên nhân**: Redirect URI không khớp với cấu hình trong Google Console

**Giải pháp**:
1. Kiểm tra lại **Authorized redirect URIs** trong Google Console
2. Đảm bảo URL chính xác 100% (bao gồm http/https, port)
3. Không có trailing slash

### Lỗi: "Access blocked: This app's request is invalid"

**Nguyên nhân**: OAuth consent screen chưa được cấu hình đúng

**Giải pháp**:
1. Hoàn thành OAuth consent screen configuration
2. Thêm test users nếu app ở chế độ "Testing"
3. Verify app nếu muốn public

### Lỗi: "idpiframe_initialization_failed"

**Nguyên nhân**: Cookie bị block hoặc third-party cookies disabled

**Giải pháp**:
1. Enable third-party cookies trong browser
2. Thêm `http://localhost:3000` vào Authorized JavaScript origins
3. Clear browser cache và cookies

### Lỗi: "Invalid token"

**Nguyên nhân**: Token đã hết hạn hoặc không hợp lệ

**Giải pháp**:
1. Kiểm tra GOOGLE_CLIENT_ID trong .env
2. Verify token ngay sau khi nhận từ Google
3. Check server logs để xem chi tiết lỗi

### User không được tạo trong database

**Kiểm tra**:
1. MongoDB connection string đúng chưa
2. Server logs có lỗi gì không
3. User model có đúng schema không
4. Passport strategy có được config đúng không

---

## 🔐 Security Best Practices

### 1. Bảo vệ Client Secret

```bash
# KHÔNG commit vào Git
echo "server/.env" >> .gitignore
echo "client/.env.local" >> .gitignore
```

### 2. Validate Token

Backend luôn verify token với Google trước khi tin tưởng:

```javascript
const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID
})
```

### 3. HTTPS trong Production

```env
# Production .env
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback
CLIENT_URL=https://yourdomain.com
```

### 4. Rate Limiting

Thêm rate limiting cho auth endpoints:

```javascript
import rateLimit from 'express-rate-limit'

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 requests per window
})

router.post('/google/verify', authLimiter, async (req, res) => {
  // ...
})
```

---

## 📱 Production Deployment

### 1. Update Google Console

1. Thêm production domain vào **Authorized domains**
2. Thêm production URLs vào **Authorized JavaScript origins**
3. Thêm production URLs vào **Authorized redirect URIs**

### 2. Update Environment Variables

```env
# Production
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://api.yourdomain.com/api/auth/google/callback
CLIENT_URL=https://yourdomain.com
```

### 3. Verify App (Optional)

Nếu muốn public app cho tất cả users:
1. Vào OAuth consent screen
2. Click **"Publish App"**
3. Submit for verification (có thể mất vài ngày)

---

## 📚 Tài Liệu Tham Khảo

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In for Websites](https://developers.google.com/identity/sign-in/web)
- [Passport.js Google Strategy](http://www.passportjs.org/packages/passport-google-oauth20/)
- [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)

---

## ✅ Checklist

- [ ] Tạo Google Cloud Project
- [ ] Enable Google+ API
- [ ] Configure OAuth consent screen
- [ ] Tạo OAuth Client ID
- [ ] Lưu Client ID và Client Secret
- [ ] Cập nhật server/.env
- [ ] Cập nhật client/.env.local
- [ ] Cài đặt dependencies (server)
- [ ] Cài đặt dependencies (client)
- [ ] Test đăng nhập Google
- [ ] Verify user được tạo trong database
- [ ] Test trên nhiều browsers
- [ ] Setup production credentials

---

**Lưu ý**: Đảm bảo không commit file `.env` vào Git repository!
