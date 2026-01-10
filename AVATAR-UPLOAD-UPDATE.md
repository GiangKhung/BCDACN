# 📸 Cập Nhật Upload Avatar

## ✅ Đã thực hiện

Thay đổi từ **nhập URL avatar** sang **upload ảnh từ thiết bị**

### Trước:
```
URL Avatar: [https://example.com/avatar.jpg]
```

### Sau:
```
Ảnh đại diện:
[Preview Avatar]
[Chọn ảnh] [Xóa]
Chọn ảnh từ thiết bị (tối đa 5MB)
```

## 📝 Files đã sửa

### 1. `client/src/pages/Profile.jsx`

**Thêm state:**
```javascript
const [avatarPreview, setAvatarPreview] = useState('')
const [uploadingAvatar, setUploadingAvatar] = useState(false)
```

**Thêm functions:**
```javascript
// Xử lý khi chọn ảnh
const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    // Validate file type & size
    // Convert to base64
    // Update preview & formData
}

// Xóa avatar
const handleRemoveAvatar = () => {
    setAvatarPreview('')
    setFormData({ ...formData, avatar: '' })
}
```

**Cập nhật UI:**
```jsx
<div className="avatar-upload-container">
    <div className="avatar-preview">
        {avatarPreview ? (
            <img src={avatarPreview} alt="Avatar preview" />
        ) : (
            <div className="avatar-placeholder">
                <svg>...</svg>
            </div>
        )}
    </div>
    <div className="avatar-upload-actions">
        <label className="btn-upload-avatar">
            Chọn ảnh
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </label>
        <button className="btn-remove-avatar" onClick={handleRemoveAvatar}>
            Xóa
        </button>
    </div>
    <small>Chọn ảnh từ thiết bị (tối đa 5MB)</small>
</div>
```

### 2. `client/src/pages/Profile.css`

**Thêm styles:**
```css
.avatar-upload-container { ... }
.avatar-preview { ... }
.avatar-placeholder { ... }
.btn-upload-avatar { ... }
.btn-remove-avatar { ... }
```

## 🎯 Tính năng

### 1. Upload ảnh từ thiết bị
- Click button "Chọn ảnh"
- Chọn file ảnh từ máy tính/điện thoại
- Preview ngay lập tức

### 2. Validation
- **File type:** Chỉ chấp nhận file ảnh (image/*)
- **File size:** Tối đa 5MB
- **Error handling:** Hiển thị thông báo lỗi nếu không hợp lệ

### 3. Preview
- Hiển thị ảnh preview trong vòng tròn
- Placeholder icon nếu chưa có ảnh
- Responsive và đẹp mắt

### 4. Xóa ảnh
- Button "Xóa" để xóa ảnh đã chọn
- Chỉ hiển thị khi có ảnh

### 5. Convert to Base64
- Ảnh được convert sang base64
- Lưu trực tiếp vào database
- Không cần server upload riêng

## 🔧 Validation Rules

### File Type
```javascript
if (!file.type.startsWith('image/')) {
    setMessage({ type: 'error', text: 'Vui lòng chọn file ảnh!' })
    return
}
```

### File Size
```javascript
if (file.size > 5 * 1024 * 1024) {
    setMessage({ type: 'error', text: 'Kích thước ảnh không được vượt quá 5MB!' })
    return
}
```

## 📊 Flow

### Upload Flow:
```
1. User click "Chọn ảnh"
2. File picker mở
3. User chọn ảnh
4. Validate file type & size
5. Convert to base64
6. Update preview
7. Update formData
8. User click "Lưu thay đổi"
9. API update profile với base64 avatar
```

### Remove Flow:
```
1. User click "Xóa"
2. Clear preview
3. Clear formData.avatar
4. User click "Lưu thay đổi"
5. API update profile với avatar = ''
```

## 🎨 UI Design

### Avatar Preview
- Size: 120x120px
- Border radius: 50% (circle)
- Border: 3px solid #e2e8f0
- Background: #f8f9fa

### Upload Button
- Background: Gradient purple
- Icon: Upload arrow
- Hover: Transform up + shadow

### Remove Button
- Background: White
- Border: Red
- Hover: Red background + white text

## 💾 Data Storage

### Base64 Format
```javascript
// Example base64 string
"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
```

### Database
```javascript
{
    _id: "...",
    name: "Trương Hoàng Giang",
    email: "...",
    avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Base64 string
}
```

## 🧪 Testing

### Test 1: Upload ảnh hợp lệ
1. Click "Chọn ảnh"
2. Chọn file JPG/PNG < 5MB
3. ✅ Preview hiển thị
4. Click "Lưu thay đổi"
5. ✅ Avatar được cập nhật

### Test 2: Upload file không hợp lệ
1. Click "Chọn ảnh"
2. Chọn file PDF/TXT
3. ❌ Hiển thị lỗi "Vui lòng chọn file ảnh!"

### Test 3: Upload file quá lớn
1. Click "Chọn ảnh"
2. Chọn file > 5MB
3. ❌ Hiển thị lỗi "Kích thước ảnh không được vượt quá 5MB!"

### Test 4: Xóa avatar
1. Upload ảnh
2. Click "Xóa"
3. ✅ Preview trở về placeholder
4. Click "Lưu thay đổi"
5. ✅ Avatar bị xóa

## 📱 Mobile Responsive

- Avatar preview: 120x120px (desktop & mobile)
- Buttons: Stack vertical trên mobile nhỏ
- Touch-friendly: Min height 44px
- File picker: Native mobile picker

## 🔒 Security

### Client-side
- Validate file type
- Validate file size
- Sanitize file name

### Server-side
- Should validate base64 format
- Should check image dimensions
- Should scan for malware (optional)

## 💡 Tips

1. **File size:** Nén ảnh trước khi upload để giảm dung lượng
2. **Format:** Khuyến nghị JPG/PNG
3. **Dimensions:** Khuyến nghị 400x400px trở lên
4. **Preview:** Luôn hiển thị preview trước khi save

## ⚠️ Limitations

1. **Max size:** 5MB (có thể tăng nếu cần)
2. **Format:** Chỉ image/* (JPG, PNG, GIF, WebP, etc.)
3. **Storage:** Base64 tăng kích thước ~33% so với binary
4. **Performance:** Large base64 strings có thể làm chậm API

## 🚀 Future Improvements

1. **Image compression:** Tự động nén ảnh trước khi upload
2. **Crop tool:** Cho phép crop ảnh trước khi save
3. **Cloud storage:** Upload lên Cloudinary/S3 thay vì base64
4. **Multiple formats:** Hỗ trợ thêm SVG, WebP
5. **Drag & drop:** Kéo thả ảnh vào preview area

## ✅ Checklist

- [x] Thay input URL thành file upload
- [x] Thêm avatar preview
- [x] Validate file type
- [x] Validate file size
- [x] Convert to base64
- [x] Button xóa avatar
- [x] Error handling
- [x] Loading state
- [x] Responsive design
- [x] CSS styling

---

**Hoàn thành! 🎉**

Bây giờ user có thể upload ảnh đại diện trực tiếp từ thiết bị thay vì phải nhập URL!
