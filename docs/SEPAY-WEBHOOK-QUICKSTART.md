# 🚀 SePay Webhook - Hướng Dẫn Nhanh

## 📋 Form "Thêm Webhook" trên SePay

Dựa trên giao diện bạn đã cung cấp, đây là cách điền form:

---

## 📝 Các Trường Cần Điền

### 1️⃣ **Đặt tên**
```
Batdongsan
```
Hoặc tên bất kỳ để nhận diện webhook này

---

### 2️⃣ **Chọn tài khoản** 
- Chọn: **"Cả hai"** 
- Hoặc chọn tài khoản ngân hàng cụ thể

---

### 3️⃣ **Chọn điều kiện**
- **Khi tài khoản ngân hàng lớ**: 
  - Chọn tài khoản của bạn từ dropdown
  - Ví dụ: `MBBank - 0334727253 - GiangTruong`

---

### 4️⃣ **Bỏ qua nếu nội dung giao dịch không có Code thanh toán?**
- Chọn: **"Không"**
- ⚠️ Quan trọng: Phải chọn "Không" để nhận tất cả giao dịch có nội dung chuyển khoản

---

### 5️⃣ **Gọi đến URL**
```
https://abc123.ngrok.io/api/sepay/webhook
```

**Lưu ý:**
- Thay `abc123.ngrok.io` bằng URL ngrok của bạn
- URL phải có HTTPS
- Endpoint phải là `/api/sepay/webhook`

**Cách lấy URL ngrok:**
```bash
# Terminal 1: Chạy server
cd server
npm run dev

# Terminal 2: Chạy ngrok
ngrok http 5000

# Copy URL từ output:
# Forwarding: https://abc123.ngrok.io -> http://localhost:5000
```

---

### 6️⃣ **Lỗ Webhooks xác thực thành toán?**
- Chọn: **"Không"**
- Hoặc chọn "Bằng" nếu muốn xác thực bổ sung

---

### 7️⃣ **Gọi lại Webhooks khi?**
- ✅ Chọn: **"HTTP Status Code không nằm trong phạm vi từ 200 đến 299"**
- Điều này giúp SePay tự động retry nếu webhook fail

---

### 8️⃣ **Kiểu chứng thực**
- Chọn: **"OAuth 2.0"** hoặc **"Không"**

#### Khuyến nghị: Chọn "Không" (đơn giản nhất)

Nếu chọn OAuth 2.0, cần điền:
- OAuth 2.0 Access Token URL: `(để trống)`
- OAuth 2.0 Client Id: `(để trống)`
- OAuth 2.0 Client Secret: `(để trống)`

---

### 9️⃣ **Trạng thái**
- Chọn: **"Kích hoạt"**

---

## ✅ Sau Khi Điền Xong

1. Click nút **"Thêm"** (màu xanh)
2. Webhook sẽ được tạo
3. SePay sẽ tự động gửi test request đến URL của bạn

---

## 🧪 Kiểm Tra Webhook Hoạt Động

### Cách 1: Xem Logs Server
```bash
# Nếu thấy log này → Webhook đã nhận được!
📨 Received SePay webhook: {
  "id": "...",
  "gateway": "MB",
  "transaction_date": "...",
  ...
}
```

### Cách 2: Test Thủ Công
```bash
# Gửi test webhook
curl -X POST http://localhost:5000/api/sepay/test-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "paymentId": "YOUR_PAYMENT_ID",
    "amount": 1500000
  }'
```

### Cách 3: Thực Hiện Giao Dịch Thật
1. Tạo thanh toán trên website
2. Quét QR code
3. Chuyển khoản với nội dung: `THANHTOAN {paymentId}`
4. Đợi 5-10 giây
5. Kiểm tra logs server

---

## 🔍 Troubleshooting

### ❌ Webhook không nhận được

**Kiểm tra 1: Ngrok đang chạy?**
```bash
# Xem danh sách tunnels
curl http://localhost:4040/api/tunnels

# Hoặc mở browser: http://localhost:4040
```

**Kiểm tra 2: URL đúng chưa?**
- URL phải có HTTPS
- Endpoint phải là `/api/sepay/webhook`
- Ví dụ đúng: `https://abc123.ngrok.io/api/sepay/webhook`
- Ví dụ sai: `http://localhost:5000/api/sepay/webhook`

**Kiểm tra 3: Server đang chạy?**
```bash
# Test server
curl http://localhost:5000/

# Kết quả mong đợi:
{
  "message": "API Bất Động Sản đang hoạt động",
  ...
}
```

**Kiểm tra 4: Firewall/Antivirus**
- Tắt firewall tạm thời
- Cho phép ngrok qua firewall

---

## 📊 Webhook Payload Example

Khi có giao dịch, SePay sẽ gửi data như sau:

```json
{
  "id": "123456789",
  "gateway": "MB",
  "transaction_date": "2024-01-09 10:30:00",
  "account_number": "0334727253",
  "sub_account": null,
  "amount_in": 1500000,
  "amount_out": 0,
  "accumulated": 5000000,
  "code": "FT24009123456",
  "transaction_content": "THANHTOAN 67890abcdef12345",
  "reference_number": "REF123456",
  "body": "Chuyen tien"
}
```

**Các trường quan trọng:**
- `amount_in`: Số tiền nhận được
- `transaction_content`: Nội dung chuyển khoản (chứa payment ID)
- `transaction_date`: Thời gian giao dịch

---

## 🎯 Flow Hoàn Chỉnh

```
1. User tạo thanh toán
   ↓
2. Hệ thống tạo QR code với nội dung: THANHTOAN {paymentId}
   ↓
3. User quét QR và chuyển khoản
   ↓
4. Ngân hàng xử lý giao dịch
   ↓
5. SePay phát hiện giao dịch mới
   ↓
6. SePay gửi webhook đến server (5-10 giây)
   ↓
7. Server nhận webhook, parse payment ID
   ↓
8. Server verify số tiền
   ↓
9. Server cập nhật payment status = completed
   ↓
10. Server kích hoạt tin đăng
   ↓
11. User nhận thông báo thành công
```

---

## 💡 Tips

### Development
1. ✅ Sử dụng ngrok free (đủ dùng)
2. ✅ Mỗi lần restart ngrok, URL sẽ thay đổi → Cần cập nhật webhook trên SePay
3. ✅ Sử dụng `test-webhook` endpoint để test nhanh
4. ✅ Xem logs ngrok tại: http://localhost:4040

### Production
1. ✅ Sử dụng domain thật với HTTPS
2. ✅ Không cần ngrok
3. ✅ Webhook URL: `https://yourdomain.com/api/sepay/webhook`
4. ✅ Set up monitoring cho webhook failures

---

## 📞 Cần Hỗ Trợ?

### Tài liệu
- File chi tiết: `SEPAY-SETUP-GUIDE.md`
- File tích hợp: `SEPAY-INTEGRATION-GUIDE.md`

### Test
- File test: `test-sepay-payment.html`
- Mở trong browser để test đầy đủ

### SePay Support
- Website: https://my.sepay.vn
- Email: support@sepay.vn
- Docs: https://docs.sepay.vn

---

## ✅ Checklist

- [ ] Đã tạo tài khoản SePay
- [ ] Đã liên kết ngân hàng
- [ ] Đã cài ngrok: `npm install -g ngrok`
- [ ] Server đang chạy: `npm run dev`
- [ ] Ngrok đang chạy: `ngrok http 5000`
- [ ] Đã copy URL từ ngrok
- [ ] Đã tạo webhook trên SePay với URL ngrok
- [ ] Đã test và thấy logs `📨 Received SePay webhook`

**Nếu tất cả đều ✅ → Bạn đã sẵn sàng! 🎉**
