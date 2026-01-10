# 🔧 Hướng Dẫn Debug SePay Webhook

## ❌ Vấn đề: Đã thanh toán nhưng không nhận được webhook

### 📋 Checklist Debug

#### ✅ Bước 1: Kiểm tra Server đang chạy
```bash
cd server
npm run dev
```

Xem logs có dòng này không:
```
✅ Server đang chạy tại http://localhost:5000
```

---

#### ✅ Bước 2: Kiểm tra Ngrok đang chạy

Mở terminal mới:
```bash
ngrok http 5000
```

Bạn sẽ thấy:
```
Forwarding: https://abc-xyz-123.ngrok-free.app -> http://localhost:5000
```

**QUAN TRỌNG:** Copy URL này (ví dụ: `https://abc-xyz-123.ngrok-free.app`)

---

#### ✅ Bước 3: Cấu hình Webhook trên SePay Dashboard

1. **Đăng nhập:** https://my.sepay.vn

2. **Vào Webhooks:**
   - Click menu **"Webhooks"** bên trái
   - Hoặc: **"Tích hợp"** → **"Webhooks"**

3. **Kiểm tra webhook hiện tại:**
   - Xem có webhook nào đang active không?
   - URL có đúng không?
   - Trạng thái có "Kích hoạt" không?

4. **Nếu chưa có hoặc URL sai, tạo mới:**
   - Click **"Thêm Webhook"**
   - Điền thông tin:

   ```
   Tên: Batdongsan Payment
   
   Chọn tài khoản: 
   - Chọn tài khoản MB Bank - 0334727253
   
   Webhook URL: 
   - https://abc-xyz-123.ngrok-free.app/api/sepay/webhook
   (Thay abc-xyz-123 bằng URL ngrok của bạn)
   
   Loại sự kiện: In_only (chỉ tiền vào)
   
   Kiểu xác thực: Không (hoặc Api_Key)
   
   Bỏ qua nếu không có Code: KHÔNG ✅
   (Phải nhận tất cả giao dịch có nội dung THANHTOAN)
   
   Trạng thái: Kích hoạt ✅
   ```

5. **Lưu webhook**

---

#### ✅ Bước 4: Test Webhook với Test Endpoint

**Cách 1: Dùng file HTML**
1. Mở file `test-sepay-webhook.html` trong browser
2. Nhập Payment ID (lấy từ thanh toán của bạn)
3. Nhập số tiền (ví dụ: 1500000)
4. Click **"Test Webhook"**
5. Xem kết quả

**Cách 2: Dùng curl**
```bash
curl -X POST http://localhost:5000/api/sepay/test-webhook \
  -H "Content-Type: application/json" \
  -d "{\"paymentId\":\"YOUR_PAYMENT_ID\",\"amount\":1500000}"
```

**Cách 3: Dùng batch file**
```bash
check-sepay-webhook.bat
```

---

#### ✅ Bước 5: Kiểm tra Logs Server

Khi webhook được gọi, bạn sẽ thấy logs:

**Logs thành công:**
```
📨 Received SePay webhook: {...}
🔍 Looking for payment: 678a1b2c3d4e5f6789012345
✅ Payment verified, updating...
✅ Property activated: 12345xyz
🎉 Payment completed successfully: 678a1b2c3d4e5f6789012345
```

**Logs lỗi:**
```
❌ Payment not found: 678a1b2c3d4e5f6789012345
→ Payment ID không tồn tại trong database

❌ Amount mismatch. Expected: 1500000 Received: 1000000
→ Số tiền chuyển không đủ

⚠️ No payment ID found in webhook data
→ Nội dung chuyển khoản không đúng format
```

---

#### ✅ Bước 6: Kiểm tra Nội dung Chuyển khoản

Khi chuyển khoản, nội dung phải chính xác:

**Format đúng:**
```
THANHTOAN 678a1b2c3d4e5f6789012345
```

**Lưu ý:**
- ✅ Viết hoa chữ "THANHTOAN"
- ✅ Có 1 khoảng trắng giữa "THANHTOAN" và payment ID
- ✅ Payment ID phải chính xác (24 ký tự)
- ❌ Không có khoảng trắng thừa
- ❌ Không có ký tự đặc biệt

**Sai:**
```
thanhtoan 678a1b2c3d4e5f6789012345  (chữ thường)
THANHTOAN  678a1b2c3d4e5f6789012345  (2 khoảng trắng)
THANHTOAN678a1b2c3d4e5f6789012345  (không có khoảng trắng)
THANHTOAN 678a1b2c  (payment ID ngắn)
```

---

#### ✅ Bước 7: Kiểm tra Payment ID

**Lấy Payment ID:**
1. Sau khi tạo thanh toán, copy Payment ID từ response
2. Hoặc xem trong MongoDB
3. Hoặc xem trong console.log của frontend

**Kiểm tra Payment tồn tại:**
```bash
curl http://localhost:5000/api/sepay/check-payment/YOUR_PAYMENT_ID
```

Response:
```json
{
  "success": true,
  "data": {
    "paymentId": "678a1b2c3d4e5f6789012345",
    "status": "pending",
    "amount": 1500000,
    "webhookReceived": false,
    "transactionId": null,
    "confirmedAt": null
  }
}
```

---

## 🔍 Các Trường Hợp Thường Gặp

### 1. Webhook không được gọi

**Nguyên nhân:**
- Ngrok đã hết hạn hoặc không chạy
- Webhook URL trên SePay không đúng
- Webhook chưa được tạo trên SePay
- Nội dung chuyển khoản không có "THANHTOAN"

**Giải pháp:**
1. Restart ngrok và copy URL mới
2. Cập nhật webhook URL trên SePay
3. Đảm bảo webhook đang "Kích hoạt"
4. Kiểm tra nội dung chuyển khoản

---

### 2. Webhook được gọi nhưng Payment not found

**Nguyên nhân:**
- Payment ID trong nội dung chuyển khoản không đúng
- Payment đã bị xóa khỏi database

**Giải pháp:**
1. Kiểm tra Payment ID có tồn tại không:
   ```bash
   curl http://localhost:5000/api/sepay/check-payment/YOUR_PAYMENT_ID
   ```
2. Tạo lại payment nếu cần
3. Copy đúng Payment ID khi chuyển khoản

---

### 3. Amount mismatch

**Nguyên nhân:**
- Số tiền chuyển ít hơn số tiền cần thanh toán

**Giải pháp:**
1. Kiểm tra số tiền trong QR code
2. Chuyển đúng số tiền
3. Hoặc chuyển nhiều hơn (hệ thống chấp nhận >= amount)

---

### 4. Webhook received nhưng Property không active

**Nguyên nhân:**
- Property ID không đúng
- Property đã bị xóa

**Giải pháp:**
1. Kiểm tra logs server
2. Kiểm tra Property tồn tại trong database
3. Xem adminNote trong Payment để biết lỗi

---

## 🧪 Test Flow Hoàn Chỉnh

### Test 1: Test với Mock Webhook

```bash
# 1. Tạo payment
# Vào http://localhost:3001/payment
# Chọn gói, tạo thanh toán
# Copy Payment ID

# 2. Test webhook
curl -X POST http://localhost:5000/api/sepay/test-webhook \
  -H "Content-Type: application/json" \
  -d "{\"paymentId\":\"YOUR_PAYMENT_ID\",\"amount\":1500000}"

# 3. Kiểm tra kết quả
curl http://localhost:5000/api/sepay/check-payment/YOUR_PAYMENT_ID
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "data": {
    "status": "completed",
    "webhookReceived": true,
    "transactionId": "TEST_1234567890"
  }
}
```

---

### Test 2: Test với SePay Thật

```bash
# 1. Đảm bảo ngrok đang chạy
ngrok http 5000

# 2. Cập nhật webhook URL trên SePay

# 3. Tạo payment và lấy QR code

# 4. Chuyển khoản qua app ngân hàng
# Nội dung: THANHTOAN YOUR_PAYMENT_ID

# 5. Đợi 5-10 giây

# 6. Kiểm tra logs server
# Phải thấy: 📨 Received SePay webhook

# 7. Kiểm tra payment status
curl http://localhost:5000/api/sepay/check-payment/YOUR_PAYMENT_ID
```

---

## 📊 Debug với Logs

### Bật debug logs

Thêm vào `server/routes/sepayWebhook.js`:

```javascript
router.post('/webhook', async (req, res) => {
    // Log tất cả
    console.log('=== WEBHOOK DEBUG ===')
    console.log('Headers:', req.headers)
    console.log('Body:', JSON.stringify(req.body, null, 2))
    console.log('===================')
    
    // ... rest of code
})
```

### Xem logs chi tiết

```bash
cd server
npm run dev

# Logs sẽ hiển thị:
# - Mọi request đến /api/sepay/webhook
# - Headers và body của webhook
# - Quá trình xử lý payment
# - Lỗi nếu có
```

---

## 🎯 Checklist Cuối Cùng

Trước khi test, đảm bảo:

- [ ] Server đang chạy (`npm run dev`)
- [ ] Ngrok đang chạy (`ngrok http 5000`)
- [ ] Webhook đã được tạo trên SePay Dashboard
- [ ] Webhook URL đúng (có `/api/sepay/webhook`)
- [ ] Webhook đang "Kích hoạt"
- [ ] Tài khoản ngân hàng đã được chọn trong webhook
- [ ] "Bỏ qua nếu không có Code" = KHÔNG
- [ ] File `.env` có đầy đủ thông tin SePay
- [ ] Payment đã được tạo và có ID
- [ ] Nội dung chuyển khoản đúng format: `THANHTOAN {paymentId}`

---

## 💡 Tips

1. **Sử dụng test endpoint trước:** Test với `/test-webhook` để đảm bảo logic đúng
2. **Kiểm tra logs thường xuyên:** Mọi thông tin debug đều ở logs
3. **Copy chính xác Payment ID:** Sai 1 ký tự là không tìm thấy payment
4. **Ngrok free có giới hạn:** URL sẽ thay đổi mỗi khi restart
5. **Test với số tiền nhỏ:** Dùng 10,000 VNĐ để test

---

## 📞 Cần Hỗ Trợ?

Nếu vẫn không hoạt động:

1. Chụp màn hình logs server
2. Chụp màn hình cấu hình webhook trên SePay
3. Gửi Payment ID để kiểm tra
4. Gửi nội dung chuyển khoản đã dùng

---

**Chúc bạn debug thành công! 🚀**
