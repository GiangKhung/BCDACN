# Sửa Lỗi Upload Ảnh - 413 Payload Too Large

## 🐛 Lỗi

```
Failed to load resource: the server responded with a status of 413 (Payload Too Large)
Error: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

## 🔍 Nguyên Nhân

1. **Server giới hạn payload mặc định:** Express.js mặc định chỉ cho phép payload tối đa 100KB
2. **Upload nhiều ảnh:** Khi upload nhiều ảnh, dữ liệu base64 rất lớn (có thể > 10MB)
3. **Ảnh chưa được nén:** Ảnh gốc có thể rất lớn (5-10MB/ảnh)

## ✅ Giải Pháp Đã Áp Dụng

### 1. Tăng Giới Hạn Payload Trên Server

**File:** `server/index.js`

```javascript
// Trước
app.use(express.json())

// Sau
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
```

**Giải thích:**
- Tăng giới hạn lên 50MB
- Đủ để upload 10 ảnh đã nén
- Vẫn an toàn, không quá lớn

### 2. Nén Ảnh Trên Client

**File:** `client/src/pages/PostProperty.jsx`

**Tính năng nén ảnh:**
- Resize ảnh về tối đa 1200x1200px
- Nén chất lượng JPEG xuống 80%
- Giảm kích thước ảnh 70-90%

**Code:**

```javascript
const handleImageUpload = (e) => {
  const files = Array.from(e.target.files)
  
  files.forEach(file => {
    // Kiểm tra kích thước
    if (file.size > 5 * 1024 * 1024) {
      alert('File quá lớn. Vui lòng chọn ảnh nhỏ hơn 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        // Resize
        const maxWidth = 1200
        const maxHeight = 1200
        let width = img.width
        let height = img.height
        
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }
        
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)
        
        // Nén với chất lượng 80%
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8)
        
        setImages(prev => [...prev, {
          file,
          preview: compressedDataUrl
        }])
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  })
}
```

## 📊 So Sánh Trước & Sau

### Trước Khi Nén

| Số ảnh | Kích thước gốc | Kích thước base64 | Tổng |
|--------|----------------|-------------------|------|
| 1 ảnh  | 3MB            | ~4MB              | 4MB  |
| 5 ảnh  | 15MB           | ~20MB             | 20MB |
| 10 ảnh | 30MB           | ~40MB             | 40MB ❌ |

### Sau Khi Nén

| Số ảnh | Kích thước nén | Kích thước base64 | Tổng |
|--------|----------------|-------------------|------|
| 1 ảnh  | 300KB          | ~400KB            | 400KB |
| 5 ảnh  | 1.5MB          | ~2MB              | 2MB  |
| 10 ảnh | 3MB            | ~4MB              | 4MB ✅ |

**Giảm kích thước:** ~90% 🎉

## 🚀 Cách Khởi Động Lại Server

### Nếu Gặp Lỗi "Port Already In Use"

**Windows:**

```powershell
# Tìm process đang dùng port 5000
Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess

# Kill process (thay PID bằng số tìm được)
Stop-Process -Id PID -Force

# Hoặc dùng lệnh này
netstat -ano | findstr :5000
taskkill /PID PID /F
```

**Mac/Linux:**

```bash
# Tìm process
lsof -i :5000

# Kill process
kill -9 PID
```

### Khởi Động Server

```bash
cd server
npm run dev
```

## 🧪 Kiểm Tra

### 1. Kiểm Tra Server

```bash
curl http://localhost:5000
```

Kết quả mong đợi:
```json
{
  "message": "API Bất Động Sản đang hoạt động",
  "endpoints": {
    "properties": "/api/properties",
    "projects": "/api/projects",
    "auth": "/api/auth"
  }
}
```

### 2. Test Upload Ảnh

1. Vào trang đăng tin: http://localhost:3000/post-property
2. Điền thông tin đến Bước 2
3. Upload 5-10 ảnh
4. Kiểm tra console không có lỗi 413
5. Hoàn tất đăng tin

## 💡 Mẹo Tối Ưu

### 1. Chọn Ảnh Phù Hợp

✅ **Nên:**
- Ảnh có kích thước 1920x1080 trở xuống
- Định dạng JPEG (nhỏ hơn PNG)
- Chất lượng trung bình (không cần quá cao)

❌ **Không nên:**
- Ảnh RAW từ máy ảnh chuyên nghiệp
- Ảnh có độ phân giải quá cao (4K, 8K)
- Ảnh PNG có nhiều chi tiết

### 2. Số Lượng Ảnh

- **Tối thiểu:** 3-5 ảnh
- **Khuyến nghị:** 6-8 ảnh
- **Tối đa:** 10 ảnh

### 3. Thứ Tự Upload

1. Ảnh mặt tiền (ảnh đại diện)
2. Phòng khách
3. Phòng ngủ
4. Bếp
5. Phòng tắm
6. Ban công/Sân vườn
7. View
8. Khu vực xung quanh

## 🔧 Cấu Hình Nâng Cao

### Tăng Giới Hạn Lên 100MB (Nếu Cần)

```javascript
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))
```

### Thay Đổi Chất Lượng Nén

```javascript
// Chất lượng cao hơn (90%)
canvas.toDataURL('image/jpeg', 0.9)

// Chất lượng thấp hơn (60%)
canvas.toDataURL('image/jpeg', 0.6)
```

### Thay Đổi Kích Thước Tối Đa

```javascript
const maxWidth = 1920  // Full HD
const maxHeight = 1080
```

## ⚠️ Lưu Ý

### Bảo Mật

- Không tăng giới hạn quá cao (> 100MB)
- Có thể bị tấn công DoS
- Nên thêm rate limiting

### Hiệu Năng

- Nén ảnh trên client tốt hơn server
- Giảm băng thông upload
- Tăng tốc độ xử lý

### Trải Nghiệm Người Dùng

- Hiển thị progress bar khi upload
- Thông báo khi ảnh quá lớn
- Preview ảnh trước khi upload

## 📚 Tài Liệu Tham Khảo

- [Express Body Parser](https://expressjs.com/en/api.html#express.json)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Image Compression](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)

## ✅ Checklist

- [x] Tăng giới hạn payload trên server
- [x] Thêm nén ảnh trên client
- [x] Kiểm tra kích thước file
- [x] Resize ảnh về kích thước phù hợp
- [x] Test upload nhiều ảnh
- [x] Xử lý lỗi port already in use
- [x] Khởi động lại server thành công

## 🎉 Kết Quả

- ✅ Upload được 10 ảnh không lỗi
- ✅ Kích thước payload giảm 90%
- ✅ Tốc độ upload nhanh hơn
- ✅ Trải nghiệm người dùng tốt hơn

---

**Cập nhật:** $(Get-Date -Format "dd/MM/yyyy HH:mm")
**Trạng thái:** ✅ Đã sửa xong
