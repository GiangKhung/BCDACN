# 🔐 Hướng Dẫn Lấy Thông Tin Cấu Hình SePay

## 📋 Tổng Quan

Để tích hợp SePay vào hệ thống, bạn cần lấy 4 thông tin quan trọng:
1. **SEPAY_ACCESS_TOKEN** - Token để gọi API
2. **SEPAY_BANK_ACCOUNT_ID** - ID tài khoản ngân hàng
3. **SEPAY_WEBHOOK_SECRET** - Secret key để xác thực webhook
4. **SEPAY_API_URL** - URL API (mặc định: https://my.sepay.vn/api/v1)

---

## 🚀 Bước 1: Đăng Ký Tài Khoản SePay

### 1.1. Truy cập website SePay
- URL: **https://my.sepay.vn**
- Hoặc: **https://sepay.vn**

### 1.2. Đăng ký tài khoản mới
1. Click vào nút **"Đăng ký"** ở góc phải trên
2. Điền thông tin:
   - Email
   - Số điện thoại
   - Mật khẩu
   - Xác nhận mật khẩu
3. Nhấn **"Đăng ký"**
4. Xác thực email/số điện thoại

### 1.3. Đăng nhập
- Sử dụng email và mật khẩu vừa đăng ký
- Đăng nhập vào dashboard

---

## 🏦 Bước 2: Liên Kết Tài Khoản Ngân Hàng

### 2.1. Vào menu Ngân Hàng
1. Sau khi đăng nhập, click vào menu **"Ngân Hàng"** bên trái
2. Hoặc vào **"Tài khoản"** → **"Ngân hàng"**

### 2.2. Thêm tài khoản ngân hàng
1. Click nút **"Thêm tài khoản ngân hàng"**
2. Chọn ngân hàng của bạn (VCB, TCB, MB, ACB, v.v.)
3. Điền thông tin:
   - **Số tài khoản**: Số tài khoản ngân hàng của bạn
   - **Tên chủ tài khoản**: Tên đầy đủ theo CMND/CCCD
   - **Chi nhánh**: Chi nhánh mở tài khoản (nếu có)

### 2.3. Xác thực tài khoản
1. SePay sẽ yêu cầu xác thực bằng cách:
   - Chuyển 1 khoản tiền nhỏ (vài nghìn đồng)
   - Hoặc upload ảnh sao kê
2. Làm theo hướng dẫn để hoàn tất xác thực

### 2.4. Lấy Bank Account ID ✅
Sau khi liên kết thành công:
1. Vào **"Ngân hàng"** → **"Danh sách tài khoản"**
2. Click vào tài khoản vừa thêm
3. Trong URL hoặc chi tiết tài khoản, bạn sẽ thấy **ID**
4. Ví dụ: `https://my.sepay.vn/bank-accounts/12345`
   - → **SEPAY_BANK_ACCOUNT_ID = 12345**

**Hoặc:**
1. Click vào tài khoản ngân hàng
2. Xem phần **"Thông tin chi tiết"**
3. Copy **"ID tài khoản"** hoặc **"Account ID"**

```env
SEPAY_BANK_ACCOUNT_ID=12345
```

---

## 🔑 Bước 3: Lấy Access Token

### 3.1. Vào menu API & Webhook
1. Click vào menu **"Cài đặt"** hoặc **"Settings"**
2. Chọn **"API & Webhook"** hoặc **"Developer"**
3. Hoặc truy cập trực tiếp: **https://my.sepay.vn/settings/api**

### 3.2. Tạo Access Token mới
1. Tìm phần **"Access Token"** hoặc **"API Keys"**
2. Click nút **"Tạo Token mới"** hoặc **"Generate New Token"**
3. Điền thông tin:
   - **Tên token**: Ví dụ "Real Estate Website"
   - **Mô tả**: "Token cho website bất động sản"
   - **Quyền**: Chọn các quyền cần thiết:
     - ✅ Read transactions
     - ✅ Read webhooks
     - ✅ Create webhooks
     - ✅ Read bank accounts

### 3.3. Copy Access Token ✅
1. Sau khi tạo, token sẽ hiển thị **MỘT LẦN DUY NHẤT**
2. **QUAN TRỌNG**: Copy và lưu token ngay lập tức
3. Token có dạng: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. Paste vào file `.env`:

```env
SEPAY_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Lưu ý:**
- Nếu mất token, bạn phải tạo token mới
- Không chia sẻ token với người khác
- Token này có quyền truy cập tài khoản của bạn

---

## 🔐 Bước 4: Tạo Webhook Secret

### 4.1. Webhook Secret là gì?
- Là một chuỗi bí mật dùng để xác thực webhook
- Đảm bảo webhook đến từ SePay, không phải từ nguồn khác
- Bạn tự tạo và lưu trữ

### 4.2. Cách tạo Webhook Secret
Có 3 cách:

#### Cách 1: Tạo ngẫu nhiên (Khuyến nghị)
```bash
# Trên Linux/Mac
openssl rand -hex 32

# Hoặc dùng Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Kết quả: a7c3b4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3
```

#### Cách 2: Tạo thủ công
Tạo một chuỗi ngẫu nhiên dài, ví dụ:
```
sepay_webhook_secret_2024_batdongsan_xyz123abc
```

#### Cách 3: Sử dụng website generator
- Truy cập: https://www.random.org/strings/
- Hoặc: https://passwordsgenerator.net/

### 4.3. Lưu Webhook Secret ✅
```env
SEPAY_WEBHOOK_SECRET=a7c3b4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3
```

**Lưu ý:**
- Secret này bạn tự tạo và quản lý
- Sẽ dùng khi cấu hình webhook trên SePay
- Không chia sẻ với ai

---

## 🌐 Bước 5: Cấu Hình Webhook trên SePay

### 5.1. Chuẩn bị Webhook URL

#### Development (Local):
Bạn cần expose localhost ra internet bằng **ngrok** hoặc **localtunnel**:

**Sử dụng ngrok:**
```bash
# Cài đặt ngrok
npm install -g ngrok

# Chạy server local
cd server
npm run dev

# Mở terminal mới, expose port 5000
ngrok http 5000

# Kết quả:
# Forwarding: https://abc123.ngrok.io -> http://localhost:5000
```

**Webhook URL sẽ là:**
```
https://abc123.ngrok.io/api/sepay/webhook
```

#### Production:
```
https://yourdomain.com/api/sepay/webhook
```

### 5.2. Tạo Webhook trên SePay Dashboard

1. **Vào menu Webhook**
   - Đăng nhập vào https://my.sepay.vn
   - Click menu **"Webhooks"** bên trái
   - Hoặc vào: **"Tích hợp"** → **"Webhooks"**

2. **Click nút "Thêm Webhook"** (góc phải trên)

3. **Điền thông tin theo form:**

#### Bước 1: Chọn tài khoản
- **Đặt tên**: `Batdongsan` (hoặc tên bạn muốn)
- **Chọn tài khoản**: Chọn **"Cả hai"** hoặc tài khoản ngân hàng bạn đã liên kết
- **Chọn điều kiện**: Chọn tài khoản ngân hàng cụ thể (ví dụ: MBBank - 0334727253 - GiangTruong)

#### Bước 2: Chọn điều kiện
- **Khi tài khoản ngân hàng lớ**: Chọn tài khoản của bạn từ dropdown
- **Bỏ qua nếu nội dung giao dịch không có Code thanh toán?**: Chọn **"Không"**
  - Lý do: Chúng ta cần nhận tất cả giao dịch có nội dung `THANHTOAN {paymentId}`

#### Bước 3: Thuộc tính Webhooks
- **Gọi đến URL**: 
  ```
  https://abc123.ngrok.io/api/sepay/webhook
  ```
  (Thay `abc123.ngrok.io` bằng URL ngrok của bạn)
  
- **Lỗ Webhooks xác thực thành toán?**: Chọn **"Không"**
  - Hoặc có thể chọn "Bằng" nếu muốn xác thực thêm

- **Gọi lại Webhooks khi?**: 
  - ✅ Chọn: **"HTTP Status Code không nằm trong phạm vi từ 200 đến 299"**
  - Điều này đảm bảo SePay sẽ gọi lại nếu webhook fail

#### Bước 4: Cấu hình chứng thực Webhooks
- **Kiểu chứng thực**: Chọn **"OAuth 2.0"** hoặc **"Không"**
  
  **Khuyến nghị: Chọn "Không" cho đơn giản**
  - Nếu chọn OAuth 2.0, bạn cần điền:
    - OAuth 2.0 Access Token URL
    - OAuth 2.0 Client Id
    - OAuth 2.0 Client Secret

#### Bước 5: Trạng thái
- **Trạng thái**: Chọn **"Kích hoạt"**

4. **Click nút "Thêm"** (màu xanh) để lưu

### 5.3. Cấu hình nâng cao (Tùy chọn)

Nếu bạn muốn xác thực webhook bằng API Key:

1. **Sửa code trong `server/routes/sepayWebhook.js`:**
```javascript
// Thêm middleware để check API key
router.post('/webhook', async (req, res) => {
    // Check API key từ header hoặc body
    const apiKey = req.headers['x-api-key'] || req.body.api_key
    
    if (apiKey !== process.env.SEPAY_WEBHOOK_SECRET) {
        return res.status(401).json({
            success: false,
            message: 'Invalid API key'
        })
    }
    
    // ... rest of code
})
```

2. **Trên SePay, chọn kiểu xác thực "OAuth 2.0" hoặc custom header**

### 5.4. Test Webhook
1. Sau khi tạo webhook, SePay sẽ tự động gửi test request
2. Kiểm tra logs server của bạn:
```bash
# Nếu thấy log này → Thành công!
📨 Received SePay webhook: {...}
```

3. Nếu không nhận được webhook:
   - Kiểm tra ngrok đang chạy
   - Kiểm tra URL webhook đúng chưa
   - Xem logs lỗi trên SePay dashboard

---

## 📝 Bước 6: Cập Nhật File .env

Sau khi có đủ thông tin, cập nhật file `server/.env`:

```env
# SePay Configuration
SEPAY_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
SEPAY_BANK_ACCOUNT_ID=12345
SEPAY_WEBHOOK_SECRET=a7c3b4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3
SEPAY_API_URL=https://my.sepay.vn/api/v1

# Thông tin ngân hàng (cho QR code)
SEPAY_BANK_CODE=VCB
SEPAY_BANK_NAME=Vietcombank
SEPAY_ACCOUNT_NUMBER=1234567890
```

### Giải thích các trường bổ sung:

| Trường | Mô tả | Ví dụ |
|--------|-------|-------|
| `SEPAY_BANK_CODE` | Mã ngân hàng (3 ký tự) | VCB, TCB, MB, ACB |
| `SEPAY_BANK_NAME` | Tên ngân hàng | Vietcombank, Techcombank |
| `SEPAY_ACCOUNT_NUMBER` | Số tài khoản của bạn | 1234567890 |

**Danh sách mã ngân hàng phổ biến:**
- VCB - Vietcombank
- TCB - Techcombank
- MB - MB Bank
- ACB - ACB
- VPB - VPBank
- TPB - TPBank
- STB - Sacombank
- VIB - VIB
- SHB - SHB
- BIDV - BIDV
- AGR - Agribank

---

## ✅ Bước 7: Kiểm Tra Cấu Hình

### 7.1. Restart Server
```bash
cd server
npm run dev
```

### 7.2. Test với file HTML
1. Mở file `test-sepay-payment.html` trong browser
2. Đăng nhập
3. Tạo thanh toán với phương thức "SePay QR"
4. Kiểm tra QR code có hiển thị không

### 7.3. Test Webhook
```bash
# Gửi test webhook
curl -X POST http://localhost:5000/api/sepay/test-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "paymentId": "YOUR_PAYMENT_ID",
    "amount": 1500000
  }'
```

### 7.4. Kiểm tra logs
Nếu thấy các log sau → Thành công:
```
✅ Server đang chạy tại http://localhost:5000
📨 Received SePay webhook
🔍 Looking for payment: 67890abcdef
✅ Payment verified, updating...
✅ Property activated: 12345xyz
🎉 Payment completed successfully
```

---

## 🔍 Troubleshooting

### Lỗi 1: "Invalid Access Token"
**Nguyên nhân:** Token không đúng hoặc đã hết hạn

**Giải pháp:**
1. Kiểm tra lại token trong file `.env`
2. Tạo token mới trên SePay dashboard
3. Copy token mới và cập nhật `.env`
4. Restart server

### Lỗi 2: "Bank Account not found"
**Nguyên nhân:** Bank Account ID không đúng

**Giải pháp:**
1. Vào SePay → Ngân hàng → Danh sách tài khoản
2. Click vào tài khoản
3. Copy đúng ID
4. Cập nhật `SEPAY_BANK_ACCOUNT_ID` trong `.env`

### Lỗi 3: "Webhook not received"
**Nguyên nhân:** URL không accessible từ internet

**Giải pháp:**
1. Kiểm tra ngrok đang chạy: `ngrok http 5000`
2. Copy đúng URL từ ngrok
3. Cập nhật webhook URL trên SePay
4. Đảm bảo server đang chạy

### Lỗi 4: "Invalid webhook signature"
**Nguyên nhân:** Webhook secret không khớp

**Giải pháp:**
1. Kiểm tra `SEPAY_WEBHOOK_SECRET` trong `.env`
2. Kiểm tra API Key trong webhook config trên SePay
3. Đảm bảo 2 giá trị giống nhau
4. Cập nhật và restart server

---

## 📚 Tài Liệu Tham Khảo

### SePay Official
- Dashboard: https://my.sepay.vn
- Documentation: https://docs.sepay.vn
- Support: support@sepay.vn

### Tools
- ngrok: https://ngrok.com
- localtunnel: https://localtunnel.github.io
- Webhook testing: https://webhook.site

### Video Hướng Dẫn
- Tìm kiếm trên YouTube: "Hướng dẫn sử dụng SePay"
- Hoặc: "SePay webhook integration"

---

## 💡 Tips & Best Practices

### Security
1. ✅ Không commit file `.env` lên Git
2. ✅ Sử dụng `.env.example` cho template
3. ✅ Tạo webhook secret dài và phức tạp
4. ✅ Rotate token định kỳ (3-6 tháng)

### Development
1. ✅ Sử dụng ngrok cho local testing
2. ✅ Test webhook với `test-webhook` endpoint
3. ✅ Kiểm tra logs thường xuyên
4. ✅ Backup cấu hình quan trọng

### Production
1. ✅ Sử dụng HTTPS cho webhook URL
2. ✅ Monitor webhook failures
3. ✅ Set up alerting cho payment issues
4. ✅ Keep logs for debugging

---

## 🎯 Checklist Hoàn Thành

Đánh dấu ✅ khi hoàn thành:

- [ ] Đăng ký tài khoản SePay
- [ ] Liên kết tài khoản ngân hàng
- [ ] Lấy Bank Account ID
- [ ] Tạo Access Token
- [ ] Tạo Webhook Secret
- [ ] Cấu hình file `.env`
- [ ] Tạo webhook trên SePay dashboard
- [ ] Test với ngrok (development)
- [ ] Test tạo QR code
- [ ] Test webhook
- [ ] Kiểm tra payment flow hoàn chỉnh

---

## 🎉 Kết Luận

Sau khi hoàn thành tất cả các bước trên, bạn đã có:
- ✅ Tài khoản SePay đã xác thực
- ✅ Tài khoản ngân hàng đã liên kết
- ✅ Access Token để gọi API
- ✅ Webhook đã cấu hình
- ✅ Hệ thống thanh toán QR hoạt động

Bây giờ bạn có thể:
1. Tạo QR code thanh toán tự động
2. Nhận webhook khi có giao dịch
3. Tự động xác nhận thanh toán
4. Kích hoạt tin đăng ngay lập tức

**Chúc bạn thành công! 🚀**

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề, bạn có thể:
1. Đọc lại hướng dẫn này
2. Xem file `SEPAY-INTEGRATION-GUIDE.md`
3. Liên hệ SePay support: support@sepay.vn
4. Tham gia group/forum SePay community

**Hotline SePay:** (Kiểm tra trên website chính thức)
**Email:** support@sepay.vn
**Facebook:** fb.com/sepay.vn
