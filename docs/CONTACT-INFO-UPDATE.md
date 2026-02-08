# 📞 Cập Nhật Thông Tin Liên Hệ

## ✅ Đã thực hiện

### 1. **Hiển thị số điện thoại đúng**
- Lấy số điện thoại từ `property.agent.phone` hoặc `property.contactPhone`
- Format: `0965 082 ***` (ẩn 3 số cuối)
- Click "Hiện số" → Hiển thị đầy đủ: `0965 082 123`
- Click lần 2 → Gọi điện thoại

### 2. **Chức năng Chat Zalo**
- Click button → Mở Zalo với số điện thoại
- URL: `https://zalo.me/0965082123`

### 3. **Chức năng Lưu tin**
- Click "Lưu tin" → Lưu vào danh sách yêu thích
- Click lại → Bỏ lưu
- Hiển thị trạng thái: "Đã lưu tin" với icon đầy
- Yêu cầu đăng nhập nếu chưa login

## 📝 Files đã sửa

### 1. `client/src/pages/PropertyDetail.jsx`

**Thêm state:**
```javascript
const [showFullPhone, setShowFullPhone] = useState(false)
const [isSaved, setIsSaved] = useState(false)
const [savingProperty, setSavingProperty] = useState(false)
```

**Thêm functions:**
```javascript
// Kiểm tra tin đã lưu chưa
const checkIfSaved = async () => { ... }

// Lưu/Bỏ lưu tin
const handleSaveProperty = async () => { ... }

// Hiện số điện thoại
const handleShowPhone = () => { ... }

// Gọi điện thoại
const handleCallPhone = (phone) => { ... }

// Chat Zalo
const handleZaloChat = (phone) => { ... }

// Format số điện thoại
const formatPhoneDisplay = (phone) => { ... }
```

**Cập nhật buttons:**
```javascript
// Button Zalo - có onClick
<button onClick={() => handleZaloChat(property.agent?.phone)}>

// Button Phone - hiện số và gọi
<button onClick={() => showFullPhone ? handleCallPhone() : handleShowPhone()}>

// Button Save - lưu tin
<button className={isSaved ? 'saved' : ''} onClick={handleSaveProperty}>
```

### 2. `client/src/pages/PropertyDetail.css`

**Thêm styles cho saved state:**
```css
.btn-favorite-detail.saved {
    background: #e03e52;
    color: white;
    border-color: #e03e52;
}

.btn-favorite-detail.saved svg {
    fill: white;
}

.btn-favorite-detail:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
```

### 3. `server/routes/properties.js`

**Thêm endpoint save property:**
```javascript
// POST /api/properties/:id/save
router.post('/:id/save', auth, async (req, res) => {
    // Toggle save/unsave property
    // Update user.savedProperties array
})
```

**Thêm auth middleware:**
```javascript
const auth = async (req, res, next) => {
    // Verify JWT token
    // Attach user to request
}
```

## 🧪 Cách test

### Test 1: Xem demo
Mở file `test-contact-info.html` trong browser để xem demo tương tác

### Test 2: Test trên UI thật

1. **Start server:**
```bash
cd server
npm run dev
```

2. **Start client:**
```bash
cd client
npm run dev
```

3. **Test flow:**
   - Vào trang chi tiết tin đăng
   - Click "Hiện số" → Xem số đầy đủ
   - Click lại → Gọi điện thoại
   - Click "Chat qua Zalo" → Mở Zalo
   - Click "Lưu tin" → Lưu vào yêu thích
   - Click lại → Bỏ lưu

### Test 3: Test API

**Test save property:**
```bash
# Login first
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Copy token, then save property
curl -X POST http://localhost:5000/api/properties/PROPERTY_ID/save \
  -H "Authorization: Bearer YOUR_TOKEN"

# Response:
{
  "success": true,
  "message": "Đã lưu tin thành công",
  "isSaved": true
}
```

## 📊 Cấu trúc dữ liệu

### Property object:
```javascript
{
  _id: "...",
  title: "...",
  agent: {
    name: "Trương Hoàng Giang",
    phone: "0965082123",
    email: "...",
    avatar: "..."
  },
  contactPhone: "0965082123", // Fallback nếu không có agent
  ...
}
```

### User object:
```javascript
{
  _id: "...",
  name: "...",
  email: "...",
  savedProperties: [
    "property_id_1",
    "property_id_2",
    ...
  ]
}
```

## 🎯 Tính năng

### 1. Hiện số điện thoại
- **Mặc định:** `0965 082 ***`
- **Sau khi click:** `0965 082 123`
- **Click lần 2:** Gọi điện thoại (`tel:0965082123`)

### 2. Chat Zalo
- Mở Zalo với số điện thoại
- URL: `https://zalo.me/0965082123`
- Mở trong tab mới

### 3. Lưu tin
- **Chưa đăng nhập:** Alert "Vui lòng đăng nhập"
- **Đã đăng nhập:** Toggle save/unsave
- **UI feedback:** 
  - Chưa lưu: Icon rỗng, text "Lưu tin"
  - Đã lưu: Icon đầy, text "Đã lưu tin", background đỏ

## 🔧 Xử lý lỗi

### 1. Không có số điện thoại
```javascript
const phone = property.agent?.phone || property.contactPhone || '0965082123'
```
Fallback về số mặc định nếu không có

### 2. Chưa đăng nhập
```javascript
if (!token) {
    alert('Vui lòng đăng nhập để lưu tin')
    window.location.href = '/login'
    return
}
```

### 3. API error
```javascript
try {
    // Save property
} catch (error) {
    alert('Không thể lưu tin. Vui lòng thử lại.')
}
```

## 💡 Tips

1. **Số điện thoại:** Luôn có fallback để tránh lỗi
2. **Zalo:** Clean phone number (remove spaces, dashes)
3. **Save tin:** Check login trước khi gọi API
4. **UI feedback:** Disable button khi đang xử lý

## 📱 Mobile responsive

Các button đã responsive:
- Width: 100%
- Padding: 16px
- Font size: 16px
- Touch-friendly (min height 48px)

## 🎨 Design

- **Zalo button:** White background, blue border
- **Phone button:** Teal gradient
- **Save button:** 
  - Default: White background, red border
  - Saved: Red background, white text
- **Hover effects:** Transform translateY(-2px), shadow

## ✅ Checklist

- [x] Hiển thị số điện thoại từ property.agent.phone
- [x] Ẩn 3 số cuối mặc định
- [x] Click "Hiện số" → Hiển thị đầy đủ
- [x] Click lần 2 → Gọi điện thoại
- [x] Button Chat Zalo hoạt động
- [x] Button Lưu tin hoạt động
- [x] API save property
- [x] Check login trước khi save
- [x] UI feedback khi saved
- [x] Error handling
- [x] Mobile responsive

---

**Hoàn thành! 🎉**

Bây giờ phần thông tin liên hệ đã hoạt động đầy đủ với:
- ✅ Số điện thoại đúng
- ✅ Hiện/ẩn số
- ✅ Gọi điện thoại
- ✅ Chat Zalo
- ✅ Lưu tin
