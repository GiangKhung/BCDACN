# ✅ Quick Fix Checklist - SePay Payment

## 🔧 Đã sửa:

### 1. ✅ File `server/.env`
- Sửa `SEPAY_API_URL` từ webhook URL → `https://my.sepay.vn/api/v1`

### 2. ✅ File `server/routes/auth.js`
- Sửa middleware `auth`: `decoded.id` → `decoded.userId`
- Fix lỗi 404 với `/api/auth/profile`

---

## 🧪 Cách test:

### Test 1: Kiểm tra server
```bash
cd server
npm run dev
```

Xem có log này không:
```
🚀 Server đang chạy tại http://localhost:5000
```

---

### Test 2: Test với HTML file
1. Mở file `test-payment-flow.html` trong browser
2. Làm theo các bước:
   - **Bước 1:** Đăng nhập (email: test@example.com, pass: 123456)
   - **Bước 2:** Nhập Property ID và tạo thanh toán
   - **Bước 3:** Copy Payment ID
   - **Bước 4:** Click "Test Webhook" để test
   - **Bước 5:** Click "Kiểm tra trạng thái" để xem kết quả

---

### Test 3: Test với real payment

#### A. Chuẩn bị:
1. **Start server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start ngrok:**
   ```bash
   ngrok http 5000
   ```
   Copy URL (ví dụ: `https://abc-xyz.ngrok-free.app`)

3. **Cấu hình webhook trên SePay:**
   - Đăng nhập: https://my.sepay.vn
   - Vào **Webhooks** → **Thêm Webhook**
   - URL: `https://abc-xyz.ngrok-free.app/api/sepay/webhook`
   - Tài khoản: MB Bank - 0334727253
   - Loại: In_only
   - Bỏ qua nếu không có Code: **KHÔNG** ✅
   - Trạng thái: **Kích hoạt** ✅

#### B. Test flow:
1. Tạo payment qua UI hoặc HTML test file
2. Lấy Payment ID
3. Chuyển khoản với nội dung: `THANHTOAN {paymentId}`
4. Đợi 5-10 giây
5. Kiểm tra logs server (phải thấy: `📨 Received SePay webhook`)
6. Kiểm tra payment status

---

## 🔍 Debug nếu vẫn không hoạt động:

### Vấn đề 1: Webhook không nhận được
**Kiểm tra:**
- [ ] Ngrok đang chạy?
- [ ] Webhook URL đúng trên SePay?
- [ ] Webhook đang "Kích hoạt"?
- [ ] Tài khoản ngân hàng đã được chọn?
- [ ] "Bỏ qua nếu không có Code" = KHÔNG?

**Giải pháp:**
- Restart ngrok và cập nhật URL mới trên SePay
- Kiểm tra logs server khi chuyển khoản

---

### Vấn đề 2: Payment not found
**Kiểm tra:**
- [ ] Payment ID có đúng không? (24 ký tự)
- [ ] Nội dung chuyển khoản: `THANHTOAN {paymentId}`
- [ ] Không có khoảng trắng thừa?
- [ ] Viết hoa "THANHTOAN"?

**Giải pháp:**
```bash
# Kiểm tra payment tồn tại
curl http://localhost:5000/api/sepay/check-payment/YOUR_PAYMENT_ID
```

---

### Vấn đề 3: Amount mismatch
**Kiểm tra:**
- [ ] Số tiền chuyển đủ chưa?
- [ ] QR code có hiển thị đúng số tiền?

**Giải pháp:**
- Chuyển đúng số tiền hoặc nhiều hơn
- Kiểm tra logs để xem số tiền nhận được

---

## 📝 Logs cần xem:

### Logs thành công:
```
📨 Received SePay webhook: {...}
🔍 Looking for payment: 678a1b2c3d4e5f6789012345
✅ Payment verified, updating...
✅ Property activated: 12345xyz
🎉 Payment completed successfully
```

### Logs lỗi:
```
❌ Payment not found: 678a1b2c3d4e5f6789012345
❌ Amount mismatch. Expected: 1500000 Received: 1000000
⚠️ No payment ID found in webhook data
```

---

## 🎯 Files đã tạo để test:

1. **test-payment-flow.html** - Test toàn bộ flow từ login → payment → check
2. **test-sepay-webhook.html** - Test webhook đơn giản
3. **check-sepay-webhook.bat** - Script kiểm tra nhanh
4. **SEPAY-DEBUG-GUIDE.md** - Hướng dẫn debug chi tiết

---

## 💡 Tips:

1. **Luôn test với test endpoint trước:** `/api/sepay/test-webhook`
2. **Kiểm tra logs thường xuyên:** Mọi thông tin debug đều ở logs
3. **Copy chính xác Payment ID:** Sai 1 ký tự là không tìm thấy
4. **Ngrok free thay đổi URL:** Phải cập nhật lại trên SePay mỗi khi restart
5. **Test với số tiền nhỏ:** Dùng 10,000 VNĐ để test

---

## 🚀 Next Steps:

1. Restart server với config mới
2. Test với `test-payment-flow.html`
3. Nếu test endpoint hoạt động → Vấn đề là webhook từ SePay
4. Cấu hình lại webhook trên SePay Dashboard
5. Test với real payment

---

**Chúc bạn thành công! 🎉**
