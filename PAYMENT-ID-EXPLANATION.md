# 🔍 Giải Thích Payment ID vs Property ID

## ❌ Hiểu lầm phổ biến

Bạn đang nhầm lẫn giữa 2 loại ID:

### 1. Property ID (ID sản phẩm)
```
69614ec7a6fc5d6ed425b337
```
- Đây là ID của **tin đăng bất động sản**
- Cố định, không đổi
- Dùng để xem chi tiết tin đăng
- URL: `/property/69614ec7a6fc5d6ed425b337`

### 2. Payment ID (ID thanh toán)
```
678a1b2c3d4e5f6789012345
```
- Đây là ID của **đơn thanh toán**
- Tự động tạo mới mỗi lần thanh toán
- **ĐÂY MỚI LÀ ID DÙNG ĐỂ CHUYỂN KHOẢN**
- Mỗi property có thể có nhiều payment (gia hạn)

## ✅ Flow đúng

### Bước 1: Tạo Payment
```
User vào trang: /payment/69614ec7a6fc5d6ed425b337
                        ↑
                   Property ID

API tạo payment mới:
POST /api/payment/create
{
    "propertyId": "69614ec7a6fc5d6ed425b337",  ← Property ID
    "durationDays": 30,
    "paymentMethod": "sepay_qr"
}

Response:
{
    "success": true,
    "data": {
        "payment": {
            "_id": "678a1b2c3d4e5f6789012345",  ← Payment ID (MỚI TẠO)
            "property": "69614ec7a6fc5d6ed425b337",
            "amount": 1500000,
            ...
        },
        "sepayInfo": {
            "transferContent": "THANHTOAN 678a1b2c3d4e5f6789012345",
                                          ↑
                                    Payment ID (DÙNG ĐỂ CHUYỂN KHOẢN)
            "qrCodeUrl": "...",
            ...
        }
    }
}
```

### Bước 2: Chuyển khoản
```
Nội dung chuyển khoản:
THANHTOAN 678a1b2c3d4e5f6789012345
          ↑
      Payment ID (KHÔNG PHẢI Property ID!)
```

### Bước 3: Webhook nhận
```
SePay gửi webhook:
{
    "transaction_content": "THANHTOAN 678a1b2c3d4e5f6789012345",
    "amount_in": 1500000,
    ...
}

Server parse:
- Extract Payment ID: 678a1b2c3d4e5f6789012345
- Tìm Payment trong database
- Cập nhật status = "completed"
- Kích hoạt Property: 69614ec7a6fc5d6ed425b337
```

## 🔧 Cách kiểm tra đúng

### 1. Xem Payment ID trong console
Khi tạo payment, mở DevTools (F12) → Console:
```
💳 Payment created: {...}
💳 Payment ID: 678a1b2c3d4e5f6789012345  ← COPY CÁI NÀY
```

### 2. Xem trong QR code
QR code có chứa nội dung:
```
THANHTOAN 678a1b2c3d4e5f6789012345
```

### 3. Xem trong database
```javascript
// Payment document
{
    _id: "678a1b2c3d4e5f6789012345",  ← Payment ID
    property: "69614ec7a6fc5d6ed425b337",  ← Property ID
    amount: 1500000,
    status: "pending",
    ...
}
```

## 📊 Quan hệ giữa Property và Payment

```
Property (1) ←→ (Many) Payments

Property: 69614ec7a6fc5d6ed425b337
    ├── Payment 1: 678a1b2c3d4e5f6789012345 (30 ngày)
    ├── Payment 2: 678b2c3d4e5f6789012346 (gia hạn 30 ngày)
    └── Payment 3: 678c3d4e5f6789012347 (gia hạn 60 ngày)
```

Mỗi lần thanh toán (kể cả gia hạn) tạo Payment ID mới!

## 🧪 Test để hiểu rõ

### Test 1: Tạo payment và xem ID
```bash
# 1. Tạo payment
curl -X POST http://localhost:5000/api/payment/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "propertyId": "69614ec7a6fc5d6ed425b337",
    "durationDays": 30,
    "paymentMethod": "sepay_qr"
  }'

# Response sẽ có:
{
    "data": {
        "payment": {
            "_id": "678a1b2c3d4e5f6789012345"  ← ĐÂY LÀ PAYMENT ID
        }
    }
}
```

### Test 2: Check payment status
```bash
curl http://localhost:5000/api/sepay/check-payment/678a1b2c3d4e5f6789012345
                                                    ↑
                                              Payment ID (KHÔNG PHẢI Property ID)
```

## ❌ Lỗi thường gặp

### Lỗi 1: Dùng Property ID để chuyển khoản
```
❌ SAI:
THANHTOAN 69614ec7a6fc5d6ed425b337  (Property ID)

✅ ĐÚNG:
THANHTOAN 678a1b2c3d4e5f6789012345  (Payment ID)
```

### Lỗi 2: Dùng Property ID để check payment
```
❌ SAI:
GET /api/sepay/check-payment/69614ec7a6fc5d6ed425b337

✅ ĐÚNG:
GET /api/sepay/check-payment/678a1b2c3d4e5f6789012345
```

## 💡 Cách lấy đúng Payment ID

### Trong Frontend (Payment.jsx)
```javascript
// Sau khi tạo payment
const response = await fetch('/api/payment/create', {...})
const data = await response.json()

// Lấy Payment ID
const paymentId = data.data.payment._id  ← ĐÂY LÀ PAYMENT ID

console.log('Payment ID:', paymentId)
console.log('Transfer content:', `THANHTOAN ${paymentId}`)
```

### Trong QR Code
QR code tự động có nội dung đúng:
```
https://img.vietqr.io/image/MB-0334727253-compact2.png
?amount=1500000
&addInfo=THANHTOAN%20678a1b2c3d4e5f6789012345
                    ↑
              Payment ID đã được encode
```

## 🎯 Checklist

Khi thanh toán, đảm bảo:

- [ ] Đã tạo payment mới (POST /api/payment/create)
- [ ] Đã lấy Payment ID từ response
- [ ] Đã copy đúng Payment ID (24 ký tự)
- [ ] Nội dung chuyển khoản: `THANHTOAN {PAYMENT_ID}`
- [ ] KHÔNG dùng Property ID để chuyển khoản
- [ ] Check payment status với Payment ID

## 🔍 Debug

Nếu vẫn không nhận được thanh toán:

### 1. Kiểm tra Payment ID
```bash
# Xem payment có tồn tại không
curl http://localhost:5000/api/sepay/check-payment/YOUR_PAYMENT_ID

# Nếu 404 → Payment ID sai
# Nếu 200 → Payment ID đúng
```

### 2. Kiểm tra nội dung chuyển khoản
```
Nội dung bạn đã chuyển: _________________
Payment ID trong DB:     _________________

Có khớp không? YES / NO
```

### 3. Kiểm tra webhook logs
```bash
# Xem server logs
cd server
npm run dev

# Sau khi chuyển khoản, xem có log này không:
📨 Received SePay webhook: {...}
🔍 Looking for payment: 678a1b2c3d4e5f6789012345
```

## 📝 Tóm tắt

| Loại ID | Ví dụ | Dùng để làm gì |
|---------|-------|----------------|
| **Property ID** | `69614ec7a6fc5d6ed425b337` | Xem chi tiết tin đăng |
| **Payment ID** | `678a1b2c3d4e5f6789012345` | Chuyển khoản, check thanh toán |

**Nhớ:** Mỗi lần thanh toán tạo Payment ID mới, KHÔNG dùng Property ID!

---

**Bây giờ bạn đã hiểu rõ chưa? 🎓**
