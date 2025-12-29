# HƯỚNG DẪN CHỤP DỮ LIỆU MONGODB

## 1. CHUẨN BỊ

### Yêu cầu:
- MongoDB đang chạy
- Đã có dữ liệu trong database
- Terminal/Command Prompt

---

## 2. CHỤP DỮ LIỆU NGƯỜI DÙNG

### Cách 1: Sử dụng Script Node.js (Khuyến nghị)

**Bước 1:** Mở terminal trong thư mục `server`

```bash
cd server
```

**Bước 2:** Chạy script export users

```bash
node scripts/exportUsersForScreenshot.js
```

**Bước 3:** Chụp màn hình terminal
- Kết quả sẽ hiển thị danh sách người dùng đẹp mắt
- Chụp toàn bộ output

**Kết quả mẫu:**
```
📊 DANH SÁCH NGƯỜI DÙNG TRONG HỆ THỐNG

====================================================================================================
Tổng số người dùng: 5

👤 NGƯỜI DÙNG #1
----------------------------------------------------------------------------------------------------
ID:           67abc123def456789...
Họ tên:       Nguyễn Văn A
Email:        admin@batdongsan.com
Số điện thoại: 0901234567
Vai trò:      👑 Admin
Trạng thái:   ✅ Đã xác thực
Ngày tạo:     15/12/2024, 10:30:45
Cập nhật:     20/12/2024, 14:20:10
----------------------------------------------------------------------------------------------------
```

### Cách 2: Sử dụng MongoDB Compass (GUI)

**Bước 1:** Mở MongoDB Compass

**Bước 2:** Kết nối đến database
- Connection string: `mongodb://localhost:27017/batdongsan`

**Bước 3:** Chọn collection `users`

**Bước 4:** Chụp màn hình
- View: Table hoặc JSON
- Chụp danh sách users
- Chụp chi tiết 1 user

**Bước 5:** Ẩn password hash
- Click vào document
- Collapse field `password`
- Chụp lại

---

## 3. CHỤP DỮ LIỆU BẤT ĐỘNG SẢN

### Cách 1: Sử dụng Script Node.js

**Bước 1:** Chạy script export properties

```bash
node scripts/exportPropertiesForScreenshot.js
```

**Bước 2:** Chụp màn hình terminal
- Hiển thị 5 BĐS đầu tiên
- Thống kê tổng quan
- Thống kê theo loại

### Cách 2: Sử dụng MongoDB Compass

**Bước 1:** Chọn collection `properties`

**Bước 2:** Chụp các view khác nhau:
- **List view:** Danh sách tất cả properties
- **Document view:** Chi tiết 1 property
- **Schema view:** Cấu trúc dữ liệu

**Bước 3:** Filter để chụp từng loại
```javascript
// Chỉ BĐS đã duyệt
{ status: "approved" }

// Chỉ BĐS chờ duyệt
{ status: "pending" }

// BĐS bán
{ transaction: "Bán" }
```

---

## 4. CHỤP THỐNG KÊ

### Sử dụng MongoDB Compass Aggregation

**Bước 1:** Tab "Aggregations"

**Bước 2:** Thống kê theo trạng thái
```javascript
[
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
]
```

**Bước 3:** Chụp kết quả

**Bước 4:** Thống kê theo loại BĐS
```javascript
[
  {
    $group: {
      _id: "$type",
      count: { $sum: 1 },
      avgPrice: { $avg: "$price" }
    }
  },
  {
    $sort: { count: -1 }
  }
]
```

---

## 5. CHỤP COLLECTIONS KHÁC

### Projects Collection

```bash
# Trong MongoDB Compass
Collection: projects
View: Table
Chụp: Danh sách dự án với thông tin cơ bản
```

### News Collection

```bash
Collection: news
View: Table
Chụp: Danh sách tin tức
```

### Agents Collection

```bash
Collection: agents
View: Table
Chụp: Danh sách môi giới
```

---

## 6. TIPS CHỤP ẢNH ĐẸP

### Terminal/Command Prompt

1. **Tăng kích thước font:**
   - Windows: Right-click title bar → Properties → Font
   - Mac: CMD + Plus

2. **Chọn theme đẹp:**
   - Windows Terminal: Settings → Color scheme
   - Mac Terminal: Preferences → Profiles

3. **Full screen:**
   - F11 (Windows)
   - CMD + CTRL + F (Mac)

4. **Chụp màn hình:**
   - Windows: Win + Shift + S
   - Mac: CMD + Shift + 4

### MongoDB Compass

1. **Zoom phù hợp:** 100% - 125%

2. **Ẩn thông tin nhạy cảm:**
   - Password hash
   - Email thật (nếu có)
   - Số điện thoại thật

3. **Chọn view đẹp:**
   - Table view: Dễ nhìn
   - JSON view: Chi tiết
   - Schema view: Cấu trúc

4. **Highlight quan trọng:**
   - Click vào field cần highlight
   - Sẽ có màu nền

---

## 7. DANH SÁCH HÌNH CẦN CHỤP

### Cho Chương 4 - Kết Quả Thử Nghiệm

#### A. Dữ liệu Users (3 hình)

1. **Hình 4.48: Danh sách users trong MongoDB Compass**
   - View: Table
   - Hiển thị: 5-10 users
   - Columns: name, email, role, isVerified, createdAt

2. **Hình 4.49: Chi tiết 1 user document**
   - View: JSON
   - Expand tất cả fields
   - Highlight password hash (bcrypt)

3. **Hình 4.50: Thống kê users**
   - Aggregation result
   - Group by role
   - Count per role

#### B. Dữ liệu Properties (5 hình)

4. **Hình 4.51: Danh sách properties**
   - View: Table
   - Hiển thị: 10 properties
   - Columns: title, type, price, status

5. **Hình 4.52: Chi tiết 1 property**
   - View: JSON
   - Đầy đủ thông tin
   - Highlight: location (coordinates)

6. **Hình 4.53: Properties theo trạng thái**
   - Filter: { status: "approved" }
   - Hiển thị count

7. **Hình 4.54: Properties theo loại**
   - Aggregation
   - Group by type
   - Chart (nếu có)

8. **Hình 4.55: Properties với images array**
   - Expand images field
   - Hiển thị array of image paths

#### C. Database Overview (2 hình)

9. **Hình 4.56: Tất cả collections**
   - Left sidebar
   - Hiển thị: users, properties, projects, news, agents
   - Document count cho mỗi collection

10. **Hình 4.57: Database stats**
    - Database info
    - Total size
    - Number of collections
    - Number of documents

---

## 8. SCRIPT BỔ SUNG

### Tạo dữ liệu mẫu đẹp (nếu cần)

```bash
# Tạo users mẫu
node scripts/seedUsers.js

# Tạo properties mẫu
node scripts/seedData.js
```

### Export ra file JSON (backup)

```bash
# Export users
mongoexport --db=batdongsan --collection=users --out=users.json --pretty

# Export properties
mongoexport --db=batdongsan --collection=properties --out=properties.json --pretty
```

---

## 9. CHECKLIST

Trước khi chụp, đảm bảo:

- [ ] MongoDB đang chạy
- [ ] Database có dữ liệu
- [ ] Đã ẩn thông tin nhạy cảm
- [ ] Font size đủ lớn để đọc
- [ ] Màn hình sạch sẽ, không có cửa sổ khác
- [ ] Zoom phù hợp (100-125%)
- [ ] Đã test script chạy thành công

---

## 10. LƯU Ý BẢO MẬT

**QUAN TRỌNG:** Khi chụp ảnh cho báo cáo:

1. **Ẩn password hash:**
   - Collapse field password
   - Hoặc blur trong ảnh

2. **Ẩn email thật:**
   - Dùng email mẫu: user1@example.com
   - Hoặc blur email

3. **Ẩn số điện thoại thật:**
   - Dùng số mẫu: 0901234567
   - Hoặc blur số điện thoại

4. **Ẩn MongoDB connection string:**
   - Không chụp .env file
   - Không chụp connection string có password

5. **Ẩn API keys:**
   - Google Maps API key
   - JWT secret
   - Các keys khác

---

## HỖ TRỢ

Nếu gặp lỗi:

1. **Lỗi kết nối MongoDB:**
   ```bash
   # Kiểm tra MongoDB đang chạy
   mongosh
   ```

2. **Lỗi script:**
   ```bash
   # Kiểm tra .env file
   cat server/.env
   
   # Kiểm tra MONGODB_URI
   ```

3. **Không có dữ liệu:**
   ```bash
   # Seed dữ liệu mẫu
   node server/scripts/seedData.js
   ```

---

**Chúc bạn chụp ảnh thành công! 📸**
