# Fix Lỗi MongoDB Timeout

## 🔴 Vấn Đề

```
Error: querySrv ETIMEOUT _mongodb._tcp.clusterbds.pjnkt12.mongodb.net
```

Lỗi này xảy ra khi không thể kết nối đến MongoDB Atlas.

## 🔍 Nguyên Nhân

1. **IP chưa được whitelist** trên MongoDB Atlas (phổ biến nhất)
2. Network/Firewall chặn kết nối
3. Connection string không đúng
4. MongoDB Atlas cluster đang bảo trì

## ✅ Giải Pháp

### Giải Pháp 1: Whitelist IP trên MongoDB Atlas (Khuyến nghị)

**Bước 1: Truy cập MongoDB Atlas**
```
https://cloud.mongodb.com/
```

**Bước 2: Vào Network Access**
```
1. Chọn project của bạn
2. Sidebar → Security → Network Access
3. Click "Add IP Address"
```

**Bước 3: Thêm IP**

**Cách A - Allow từ mọi nơi (Development):**
```
IP Address: 0.0.0.0/0
Comment: Allow from anywhere
```

**Cách B - Chỉ IP hiện tại (An toàn hơn):**
```
1. Click "Add Current IP Address"
2. Hoặc nhập IP thủ công
```

**Bước 4: Confirm và đợi**
```
- Click "Confirm"
- Đợi 1-2 phút để cập nhật
```

### Giải Pháp 2: Sử dụng MongoDB Local

Nếu không thể kết nối MongoDB Atlas, dùng MongoDB local:

**Bước 1: Cài MongoDB Community Server**
```
https://www.mongodb.com/try/download/community
```

**Bước 2: Cập nhật .env**
```env
# Comment MongoDB Atlas
# MONGODB_URI=mongodb+srv://admin:VrH88PmVm5xodYYM@clusterbds.pjnkt12.mongodb.net/real-estate-db?retryWrites=true&w=majority&appName=ClusterBDS

# Sử dụng MongoDB Local
MONGODB_URI=mongodb://localhost:27017/real-estate-db
```

**Bước 3: Start MongoDB Service**

Windows:
```bash
# Mở Services (Win + R → services.msc)
# Tìm "MongoDB Server" → Start
```

Hoặc command line:
```bash
net start MongoDB
```

### Giải Pháp 3: Kiểm tra Connection String

**Đảm bảo format đúng:**
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

**Lưu ý:**
- Username: `admin`
- Password: `VrH88PmVm5xodYYM` (không có ký tự đặc biệt cần encode)
- Cluster: `clusterbds.pjnkt12.mongodb.net`
- Database: `real-estate-db`

## 🧪 Test Kết Nối

**Chạy script test:**
```bash
cd server
node scripts/testConnection.js
```

**Kết quả mong đợi:**
```
✅ Kết nối MongoDB thành công!
📊 Database: real-estate-db
🌐 Host: clusterbds-shard-00-00.pjnkt12.mongodb.net

📁 Collections hiện có:
   (Chưa có collection nào - database trống)
```

## 📊 Seed Dữ Liệu

Sau khi kết nối thành công, seed dữ liệu:

**Bước 1: Tạo Admin**
```bash
cd server
node scripts/createAdmin.js
```

**Bước 2: Seed Properties & Projects**
```bash
node scripts/seedData.js
```

**Bước 3: Kiểm tra**
```bash
node scripts/testConnection.js
```

Kết quả:
```
📁 Collections hiện có:
   - users
   - properties
   - projects

📈 Số lượng documents:
   - users: 1 documents
   - properties: 20 documents
   - projects: 10 documents
```

## 🔧 Troubleshooting

### Lỗi: "Authentication failed"

**Nguyên nhân:** Username/password sai

**Giải pháp:**
1. Vào MongoDB Atlas → Database Access
2. Kiểm tra username: `admin`
3. Reset password nếu cần
4. Cập nhật lại .env

### Lỗi: "Server selection timed out"

**Nguyên nhân:** Không thể kết nối đến cluster

**Giải pháp:**
1. Kiểm tra Network Access (IP whitelist)
2. Kiểm tra internet connection
3. Thử dùng VPN nếu bị chặn
4. Chuyển sang MongoDB local

### Lỗi: "MongooseServerSelectionError"

**Nguyên nhân:** Cluster không tồn tại hoặc đang bảo trì

**Giải pháp:**
1. Kiểm tra cluster status trên MongoDB Atlas
2. Đảm bảo cluster đang chạy (không bị pause)
3. Kiểm tra connection string

## 📝 Checklist

- [ ] IP đã được whitelist trên MongoDB Atlas
- [ ] Connection string đúng format
- [ ] Username/password chính xác
- [ ] Cluster đang chạy (không pause)
- [ ] Internet connection ổn định
- [ ] Firewall không chặn port 27017
- [ ] Test connection thành công
- [ ] Đã seed dữ liệu

## 🚀 Quick Fix

**Nếu vẫn không được, dùng MongoDB Local:**

```bash
# 1. Cài MongoDB Community
# Download: https://www.mongodb.com/try/download/community

# 2. Cập nhật .env
MONGODB_URI=mongodb://localhost:27017/real-estate-db

# 3. Start MongoDB
net start MongoDB

# 4. Test
cd server
node scripts/testConnection.js

# 5. Seed data
node scripts/createAdmin.js
node scripts/seedData.js

# 6. Start server
npm start
```

## 📞 Hỗ Trợ

Nếu vẫn gặp lỗi:
1. Chụp màn hình lỗi
2. Kiểm tra MongoDB Atlas status
3. Thử MongoDB local
4. Liên hệ support

---

**Lưu ý:** MongoDB Atlas free tier có giới hạn:
- 512 MB storage
- Shared RAM
- Có thể bị pause sau 60 ngày không dùng
