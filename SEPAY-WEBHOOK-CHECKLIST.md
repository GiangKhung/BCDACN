# ✅ Checklist Cấu Hình SePay Webhook

## 🚨 VẤN ĐỀ: Đã chuyển khoản nhưng không nhận được webhook

### Nguyên nhân phổ biến:
1. ❌ Webhook chưa được tạo trên SePay Dashboard
2. ❌ Webhook URL sai hoặc không accessible
3. ❌ Ngrok không chạy hoặc đã hết hạn
4. ❌ Nội dung chuyển khoản không đúng format

---

## 📋 CHECKLIST - Làm từng bước

### ✅ Bước 1: Kiểm tra Ngrok đang chạy

```bash
# Mở terminal mới
ngrok http 5000
```

**Kết quả mong đợi:**
```
Forwarding: https://abc-xyz-123.ngrok-free.app -> http://localhost:5000
```

**Copy URL này:** `https://abc-xyz-123.ngrok-free.app`

---

### ✅ Bước 2: Kiểm tra Webhook trên SePay Dashboard

1. **Đăng nhập:** https://my.sepay.vn
2. **Vào Webhooks:**
   - Click menu **"Webhooks"** bên trái
   - Hoặc: **"Tích hợp"** → **"Webhooks"**

3. **Kiểm tra:**
   - [ ] Có webhook nào đang active không?
   - [ ] URL webhook có đúng không?
   - [ ] Trạng thái có "Kích hoạt" không?

**Nếu KHÔNG có webhook hoặc URL sai → Tạo mới:**

---

### ✅ Bước 3: Tạo Webhook trên SePay

Click **"Thêm Webhook"** và điền:

```
┌─────────────────────────────────────────────────┐
│ Tên: Batdongsan Payment                         │
│                                                  │
│ Chọn tài khoản:                                 │
│ ☑ MB Bank - 0334727253 - [Tên của bạn]        │
│                                                  │
│ Webhook URL:                                    │
│ https://abc-xyz-123.ngrok-free.app/api/sepay/webhook │
│ (Thay abc-xyz-123 bằng URL ngrok của bạn)     │
│                                                  │
│ Loại sự kiện:                                   │
│ ○ In_only (chỉ tiền vào) ✓                    │
│                                                  │
│ Kiểu xác thực:                                  │
│ ○ Không                                         │
│                                                  │
│ Bỏ qua nếu không có Code:                      │
│ ○ KHÔNG ✓ (Phải nhận tất cả giao dịch)        │
│                                                  │
│ Trạng thái:                                     │
│ ○ Kích hoạt ✓                                  │
└─────────────────────────────────────────────────┘
```

**QUAN TRỌNG:**
- ✅ Webhook URL phải có `/api/sepay/webhook` ở cuối
- ✅ Chọn đúng tài khoản MB Bank 0334727253
- ✅ "Bỏ qua nếu không có Code" = **KHÔNG**
- ✅ Trạng thái = **Kích hoạt**

---

### ✅ Bước 4: Test Webhook

Sau khi tạo webhook, SePay sẽ gửi test request. Kiểm tra logs server:

```bash
# Xem logs server
cd server
npm run dev

# Nếu thấy log này → Thành công!
📨 Received SePay webhook: {...}
```

**Nếu KHÔNG thấy log:**
- Kiểm tra ngrok đang chạy
- Kiểm tra URL webhook đúng chưa
- Kiểm tra server đang chạy

---

### ✅ Bước 5: Kiểm tra nội dung chuyển khoản

Khi bạn chuyển khoản, nội dung phải CHÍNH XÁC:

```
THANHTOAN 69614ec722caa7dea7227ae6
```

**Lưu ý:**
- ✅ Viết HOA "THANHTOAN"
- ✅ Có 1 khoảng trắng
- ✅ Payment ID phải đúng (24 ký tự)
- ❌ KHÔNG có khoảng trắng thừa
- ❌ KHÔNG có ký tự đặc biệt

**SAI:**
```
thanhtoan 69614ec722caa7dea7227ae6  (chữ thường)
THANHTOAN  69614ec722caa7dea7227ae6  (2 khoảng trắng)
THANHTOAN69614ec722caa7dea7227ae6  (không có khoảng trắng)
```

---

### ✅ Bước 6: Kiểm tra Payment ID

**Đảm bảo bạn dùng đúng Payment ID, KHÔNG phải Property ID:**

```
Property ID:  69614ec7a6fc5d6ed425b337  ❌ (Không dùng cái này)
Payment ID:   69614ec722caa7dea7227ae6  ✅ (Dùng cái này)
```

**Cách lấy Payment ID:**
1. Sau khi tạo payment, xem console logs (F12)
2. Hoặc xem trong box "Mã Thanh Toán" trên trang
3. Hoặc xem trong nội dung chuyển khoản

---

## 🧪 Test ngay

### Test 1: Kiểm tra server nhận webhook

```bash
# Terminal 1: Chạy server
cd server
npm run dev

# Terminal 2: Test webhook
curl -X POST http://localhost:5000/api/sepay/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_content": "THANHTOAN 69614ec722caa7dea7227ae6",
    "amount_in": 342363456
  }'
```

**Nếu thấy log → Server OK**

### Test 2: Kiểm tra ngrok

```bash
# Test ngrok URL
curl https://your-ngrok-url.ngrok-free.app/api/sepay/webhook
```

**Nếu trả về response → Ngrok OK**

---

## 🔍 Debug

### Nếu vẫn không nhận được webhook:

1. **Xem logs SePay Dashboard:**
   - Vào Webhooks → Click vào webhook
   - Xem "Lịch sử gọi webhook"
   - Có lỗi gì không?

2. **Xem logs server:**
   ```bash
   cd server
   npm run dev
   ```
   - Có log "📨 Received SePay webhook" không?

3. **Test với tool:**
   - Mở `check-sepay-payment.html`
   - Nhập Payment ID
   - Click "Test Webhook"

---

## 💡 Giải pháp nhanh

### Nếu đã chuyển khoản THẬT:

1. **Lấy Payment ID** (24 ký tự)
2. **Mở tool:** `check-sepay-payment.html`
3. **Nhập Payment ID**
4. **Click "Test Webhook"**
5. **Xác nhận đã chuyển khoản**
6. **Tin đăng sẽ được kích hoạt ngay!**

---

## 📞 Cần hỗ trợ?

Gửi cho tôi:
1. Payment ID của bạn
2. Screenshot webhook trên SePay Dashboard
3. Logs server (nếu có)
4. Nội dung chuyển khoản đã dùng

---

**Hãy làm từng bước trong checklist này và cho tôi biết kết quả! 🚀**
