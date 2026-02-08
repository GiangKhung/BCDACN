# 🔥 Hướng Dẫn Tích Hợp SePay QR Code Payment

## 📋 Tổng Quan

Hệ thống đã được tích hợp thanh toán QR code thông qua SePay, cho phép:
- ✅ Tạo mã QR thanh toán tự động
- ✅ Nhận webhook từ SePay khi có giao dịch
- ✅ Tự động xác nhận thanh toán trong 10 giây
- ✅ Kích hoạt tin đăng tự động sau khi thanh toán thành công

## 🚀 Cài Đặt

### 1. Cài đặt dependencies

```bash
cd server
npm install axios
```

### 2. Cấu hình môi trường

Cập nhật file `server/.env`:

```env
# SePay Configuration
SEPAY_ACCESS_TOKEN=your_sepay_access_token_here
SEPAY_BANK_ACCOUNT_ID=your_bank_account_id_here
SEPAY_WEBHOOK_SECRET=your_webhook_secret_here
SEPAY_API_URL=https://my.sepay.vn/api/v1

# Thông tin ngân hàng (cho QR code)
SEPAY_BANK_CODE=VCB
SEPAY_BANK_NAME=Vietcombank
SEPAY_ACCOUNT_NUMBER=1234567890
```

### 3. Lấy thông tin từ SePay

#### Bước 1: Đăng ký tài khoản SePay
1. Truy cập: https://my.sepay.vn
2. Đăng ký tài khoản mới
3. Liên kết tài khoản ngân hàng

#### Bước 2: Lấy Access Token
1. Đăng nhập vào https://my.sepay.vn
2. Vào **Cài đặt** → **API & Webhook**
3. Tạo Access Token mới
4. Copy token và paste vào `SEPAY_ACCESS_TOKEN`

#### Bước 3: Lấy Bank Account ID
1. Vào **Ngân hàng** → **Danh sách tài khoản**
2. Chọn tài khoản muốn nhận tiền
3. Copy ID của tài khoản
4. Paste vào `SEPAY_BANK_ACCOUNT_ID`

#### Bước 4: Tạo Webhook Secret
1. Tạo một chuỗi ngẫu nhiên (ví dụ: `sepay_webhook_secret_2024_xyz`)
2. Paste vào `SEPAY_WEBHOOK_SECRET`

## 📡 Cấu Hình Webhook

### 1. Tạo Webhook trên SePay

Có 2 cách:

#### Cách 1: Qua giao diện web
1. Đăng nhập https://my.sepay.vn
2. Vào **API & Webhook** → **Webhooks**
3. Nhấn **Tạo Webhook mới**
4. Điền thông tin:
   - **Tên**: Real Estate Payment Webhook
   - **URL**: `https://your-domain.com/api/sepay/webhook`
   - **Loại sự kiện**: In_only (chỉ tiền vào)
   - **Xác thực**: Api_Key
   - **API Key**: (dùng giá trị từ `SEPAY_WEBHOOK_SECRET`)
   - **Xác thực thanh toán**: Bật
   - **Bỏ qua nếu không có mã**: Bật

#### Cách 2: Qua API (tự động)
```javascript
import sepayService from './services/sepayService.js'

// Tạo webhook
const result = await sepayService.createWebhook('https://your-domain.com/api/sepay/webhook')
console.log(result)
```

### 2. Expose Webhook URL (Development)

Để test webhook trong môi trường development, bạn cần expose localhost ra internet:

#### Sử dụng ngrok:
```bash
# Cài đặt ngrok
npm install -g ngrok

# Expose port 5000
ngrok http 5000

# Copy URL (ví dụ: https://abc123.ngrok.io)
# Webhook URL sẽ là: https://abc123.ngrok.io/api/sepay/webhook
```

#### Sử dụng localtunnel:
```bash
# Cài đặt localtunnel
npm install -g localtunnel

# Expose port 5000
lt --port 5000

# Copy URL và thêm /api/sepay/webhook
```

## 🔧 Cấu Trúc Code

### 1. Backend Files

```
server/
├── services/
│   └── sepayService.js          # Service xử lý SePay API
├── routes/
│   ├── payment.js               # Routes thanh toán (đã cập nhật)
│   └── sepayWebhook.js          # Routes webhook SePay
├── models/
│   └── Payment.js               # Model Payment (đã cập nhật)
└── index.js                     # Server entry (đã thêm route)
```

### 2. Frontend Files

```
client/src/pages/
├── Payment.jsx                  # Component thanh toán (đã cập nhật)
└── Payment.css                  # Styles (đã thêm QR styles)
```

## 📝 API Endpoints

### User APIs

#### 1. Tạo thanh toán với SePay QR
```http
POST /api/payment/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "propertyId": "67890abcdef",
  "durationDays": 30,
  "paymentMethod": "sepay_qr"
}
```

Response:
```json
{
  "success": true,
  "message": "Tạo đơn thanh toán thành công",
  "data": {
    "payment": { ... },
    "sepayInfo": {
      "qrCodeUrl": "https://img.vietqr.io/image/VCB-1234567890-compact2.png?amount=1500000&addInfo=THANHTOAN%2067890abcdef",
      "transferContent": "THANHTOAN 67890abcdef",
      "bankName": "Vietcombank",
      "accountNumber": "1234567890",
      "accountName": "CONG TY BAT DONG SAN",
      "amount": 1500000
    }
  }
}
```

#### 2. Kiểm tra trạng thái thanh toán
```http
GET /api/sepay/check-payment/{paymentId}
```

Response:
```json
{
  "success": true,
  "data": {
    "paymentId": "67890abcdef",
    "status": "completed",
    "amount": 1500000,
    "webhookReceived": true,
    "transactionId": "TEST_1234567890",
    "confirmedAt": "2024-01-09T10:30:00.000Z"
  }
}
```

### Webhook APIs

#### 1. Nhận webhook từ SePay
```http
POST /api/sepay/webhook
Content-Type: application/json
X-SePay-Signature: {signature}

{
  "id": "TXN123456",
  "gateway": "VCB",
  "transaction_date": "2024-01-09 10:30:00",
  "account_number": "1234567890",
  "amount_in": 1500000,
  "transaction_content": "THANHTOAN 67890abcdef",
  ...
}
```

#### 2. Test webhook (Development only)
```http
POST /api/sepay/test-webhook
Content-Type: application/json

{
  "paymentId": "67890abcdef",
  "amount": 1500000
}
```

## 🎯 Quy Trình Thanh Toán

### 1. User Flow

```
1. User đăng tin → Chọn gói thanh toán
2. Chọn phương thức "Quét mã QR"
3. Hệ thống tạo QR code với VietQR
4. User quét QR bằng app ngân hàng
5. User xác nhận chuyển khoản
6. SePay nhận giao dịch → Gửi webhook
7. Server xử lý webhook → Xác nhận thanh toán
8. Tin đăng được kích hoạt tự động
```

### 2. Technical Flow

```javascript
// 1. Tạo payment
POST /api/payment/create
  → Tạo Payment record
  → Generate QR code URL
  → Trả về QR cho frontend

// 2. User thanh toán
User scans QR → Transfers money

// 3. SePay webhook
POST /api/sepay/webhook
  → Verify signature
  → Parse webhook data
  → Find payment by ID
  → Verify amount
  → Update payment status
  → Activate property
  → Return success

// 4. Frontend polling (optional)
GET /api/sepay/check-payment/:id
  → Check payment status
  → Update UI
```

## 🧪 Testing

### 1. Test với Mock Webhook

```bash
# Terminal 1: Start server
cd server
npm run dev

# Terminal 2: Test webhook
curl -X POST http://localhost:5000/api/sepay/test-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "paymentId": "YOUR_PAYMENT_ID",
    "amount": 1500000
  }'
```

### 2. Test với SePay Sandbox

1. Đăng ký tài khoản SePay sandbox
2. Cấu hình webhook URL
3. Thực hiện giao dịch test
4. Kiểm tra logs

### 3. Test trên UI

1. Đăng nhập: http://localhost:3001/login
2. Đăng tin: http://localhost:3001/post-property
3. Chọn "Quét mã QR"
4. Xem QR code được tạo
5. Test webhook với curl hoặc Postman
6. Kiểm tra tin đăng được kích hoạt

## 📊 Monitoring & Logs

### Server Logs

```javascript
// Webhook received
📨 Received SePay webhook: {...}

// Payment found
🔍 Looking for payment: 67890abcdef

// Payment verified
✅ Payment verified, updating...

// Property activated
✅ Property activated: 12345xyz

// Success
🎉 Payment completed successfully: 67890abcdef
```

### Error Logs

```javascript
// Invalid signature
❌ Invalid webhook signature

// Payment not found
❌ Payment not found: 67890abcdef

// Amount mismatch
❌ Amount mismatch. Expected: 1500000 Received: 1000000
```

## 🔒 Security

### 1. Webhook Verification

```javascript
// Verify signature
const signature = req.headers['x-sepay-signature']
if (!sepayService.verifyWebhook(webhookData, signature)) {
    return res.status(401).json({ message: 'Invalid signature' })
}
```

### 2. Amount Verification

```javascript
// Verify amount
if (parsedData.amountIn < payment.amount) {
    payment.adminNote = `Số tiền không khớp`
    await payment.save()
    return res.status(400).json({ message: 'Amount mismatch' })
}
```

### 3. Duplicate Prevention

```javascript
// Check if already completed
if (payment.status === 'completed') {
    return res.status(200).json({ message: 'Payment already completed' })
}
```

## 🚨 Troubleshooting

### 1. QR Code không hiển thị

**Nguyên nhân**: Thiếu cấu hình ngân hàng

**Giải pháp**:
```env
SEPAY_BANK_CODE=VCB
SEPAY_ACCOUNT_NUMBER=1234567890
```

### 2. Webhook không nhận được

**Nguyên nhân**: URL không accessible từ internet

**Giải pháp**:
- Sử dụng ngrok hoặc localtunnel
- Kiểm tra firewall
- Kiểm tra webhook URL trên SePay dashboard

### 3. Payment không được xác nhận

**Nguyên nhân**: Nội dung chuyển khoản không đúng

**Giải pháp**:
- Kiểm tra format: `THANHTOAN {paymentId}`
- Không có khoảng trắng thừa
- Payment ID phải chính xác

### 4. Amount mismatch

**Nguyên nhân**: Số tiền chuyển không đủ

**Giải pháp**:
- Kiểm tra số tiền trong QR code
- Đảm bảo user chuyển đúng số tiền
- Kiểm tra logs để xem số tiền nhận được

## 📚 Resources

- [SePay Documentation](https://docs.sepay.vn)
- [VietQR API](https://vietqr.io)
- [SePay Dashboard](https://my.sepay.vn)
- [Webhook Testing Tool](https://webhook.site)

## 💡 Tips

1. **Development**: Sử dụng test webhook endpoint để test nhanh
2. **Production**: Đảm bảo webhook URL có HTTPS
3. **Monitoring**: Log tất cả webhook events
4. **Error Handling**: Xử lý tất cả edge cases
5. **User Experience**: Thêm polling để check payment status

## 🎉 Kết Luận

Hệ thống SePay QR payment đã được tích hợp hoàn chỉnh với:
- ✅ Tạo QR code tự động
- ✅ Webhook processing
- ✅ Auto payment confirmation
- ✅ Property activation
- ✅ Beautiful UI/UX
- ✅ Error handling
- ✅ Security measures

Sẵn sàng để sử dụng! 🚀
