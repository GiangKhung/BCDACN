# ⚡ Google OAuth - Hướng Dẫn Nhanh

## 🎯 Bạn Đang Ở Đây

Dựa vào ảnh bạn gửi, bạn đang ở trang **OAuth Overview** và thấy thông báo:
> "You haven't configured any OAuth clients for this project yet."

## 🚀 Các Bước Tiếp Theo

### Bước 1: Tạo OAuth Client

Từ trang hiện tại của bạn, click nút **"Create OAuth client"** (nút xanh bên phải).

### Bước 2: Configure Consent Screen

Sau khi click, hệ thống sẽ hiện popup hoặc redirect yêu cầu:
> "To create an OAuth client ID, you must first configure your consent screen"

Click **"Configure Consent Screen"** hoặc **"Go to Consent Screen"**

### Bước 3: Chọn User Type

**BÂY GIỜ bạn sẽ thấy màn hình chọn User Type:**

```
┌─────────────────────────────────────────────────────┐
│  Select User Type                                    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ○ Internal                                          │
│    Only available to users within your organization  │
│    (Chỉ hiện nếu có Google Workspace)               │
│                                                      │
│  ● External                                          │
│    Available to any user with a Google Account       │
│    (CHỌN CÁI NÀY)                                   │
│                                                      │
│                          [Create] [Cancel]           │
└─────────────────────────────────────────────────────┘
```

**Chọn "External"** và click **"Create"**

### Bước 4: Điền Thông Tin

Sau khi chọn External, bạn sẽ thấy form với các tab:

#### Tab 1: OAuth consent screen
```
App information:
- App name: Real Estate App
- User support email: your-email@gmail.com
- App logo: (optional)

App domain:
- Application home page: http://localhost:3000
- Privacy policy: http://localhost:3000/privacy
- Terms of service: http://localhost:3000/terms

Authorized domains:
+ Add domain: localhost

Developer contact:
- Email: your-email@gmail.com

[Save and Continue]
```

#### Tab 2: Scopes
```
Click "Add or Remove Scopes"

Chọn các scopes:
☑ .../auth/userinfo.email
☑ .../auth/userinfo.profile  
☑ openid

[Update] → [Save and Continue]
```

#### Tab 3: Test users
```
Click "Add Users"

Thêm email test:
+ your-email@gmail.com
+ teammate@gmail.com

[Add] → [Save and Continue]
```

#### Tab 4: Summary
```
Review thông tin và click [Back to Dashboard]
```

### Bước 5: Tạo Credentials

Bây giờ quay lại:
1. **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Chọn **"Web application"**
4. Điền thông tin:

```
Name: Real Estate Web Client

Authorized JavaScript origins:
+ http://localhost:3000
+ http://localhost:5000

Authorized redirect URIs:
+ http://localhost:5000/api/auth/google/callback
+ http://localhost:3000/auth/google/success

[Create]
```

### Bước 6: Lưu Credentials

Sau khi tạo, bạn sẽ thấy popup với:
```
Client ID: xxxxx-xxxxx.apps.googleusercontent.com
Client Secret: GOCSPX-xxxxxxxxxxxxx
```

**LƯU LẠI 2 THÔNG TIN NÀY!**

---

## 📝 Cập Nhật File .env

### Server (.env)
```env
GOOGLE_CLIENT_ID=xxxxx-xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:3000
```

### Client (.env.local)
```env
VITE_GOOGLE_CLIENT_ID=xxxxx-xxxxx.apps.googleusercontent.com
```

---

## 🧪 Test

1. Start server: `cd server && npm run dev`
2. Start client: `cd client && npm run dev`
3. Mở: http://localhost:3000/login
4. Click "Đăng nhập với Google"
5. Chọn tài khoản Google
6. Cho phép quyền truy cập
7. Kiểm tra đăng nhập thành công!

---

## ❓ Troubleshooting

### Không thấy tùy chọn "External" / "Internal"

**Nguyên nhân:** Consent screen đã được cấu hình rồi

**Giải pháp:**
1. Vào **OAuth consent screen** (menu bên trái)
2. Xem User Type hiện tại
3. Nếu cần đổi, click **"Make External"** hoặc edit

### Lỗi "redirect_uri_mismatch"

**Nguyên nhân:** URL không khớp

**Giải pháp:**
1. Vào **Credentials** → Click vào OAuth client
2. Kiểm tra **Authorized redirect URIs**
3. Đảm bảo có: `http://localhost:5000/api/auth/google/callback`
4. Không có dấu `/` ở cuối
5. Chính xác 100% về http/https và port

### App ở chế độ "Testing"

Khi chọn External, app sẽ ở chế độ Testing:
- Chỉ test users được thêm mới đăng nhập được
- Giới hạn 100 users
- Để public: Click **"Publish App"** (cần verify)

---

## 📚 Links Hữu Ích

- Google Cloud Console: https://console.cloud.google.com
- OAuth Consent Screen: https://console.cloud.google.com/apis/credentials/consent
- Credentials: https://console.cloud.google.com/apis/credentials
- Hướng dẫn chi tiết: Xem file `GOOGLE-OAUTH-SETUP.md`

---

## ✅ Checklist

- [ ] Vào Google Cloud Console
- [ ] Click "Create OAuth client"
- [ ] Configure Consent Screen
- [ ] Chọn "External"
- [ ] Điền App information
- [ ] Add scopes (email, profile, openid)
- [ ] Add test users
- [ ] Tạo OAuth Client ID
- [ ] Lưu Client ID và Secret
- [ ] Cập nhật file .env
- [ ] Test đăng nhập

---

**Tip:** Nếu vẫn không thấy, thử:
1. Logout khỏi Google Cloud Console
2. Login lại
3. Tạo project mới
4. Làm lại từ đầu
