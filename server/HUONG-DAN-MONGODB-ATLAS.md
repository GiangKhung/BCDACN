# 🔧 Hướng Dẫn Khắc Phục Lỗi MongoDB Atlas Connection

## ❌ Lỗi Gặp Phải
```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster.
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

## ✅ Nguyên Nhân
IP của máy tính hiện tại **chưa được thêm vào IP Whitelist** của MongoDB Atlas cluster.

---

## 🚀 Cách Khắc Phục

### **Bước 1: Truy Cập MongoDB Atlas**
1. Mở trình duyệt, truy cập: https://www.mongodb.com/cloud/atlas
2. Đăng nhập với tài khoản của bạn
3. Chọn project chứa cluster `clusterbds`

### **Bước 2: Vào Network Access**
1. Trên menu bên trái, chọn **Network Access**
2. Chọn tab **IP Whitelist**

### **Bước 3: Thêm IP Address**
**Cách 1 - Tự động (Khuyến Nghị)**:
- Click nút **Add IP Address**
- Chọn **Add Current IP Address**
- MongoDB Atlas sẽ tự động lấy IP hiện tại của bạn
- Click **Confirm**

**Cách 2 - Thêm thủ công**:
- Click nút **Add IP Address**
- Nhập IP của bạn (hoặc `0.0.0.0/0` để cho phép tất cả IP)
- Click **Confirm**

**Cách 3 - Cho phép tất cả IP (Chỉ dùng cho Development)**:
- Click nút **Add IP Address**
- Nhập: `0.0.0.0/0`
- Click **Confirm**

### **Bước 4: Chờ Cập Nhật**
- Thay đổi có thể mất **1-2 phút** để có hiệu lực
- Bạn sẽ thấy trạng thái "PENDING" → "ACTIVE"

### **Bước 5: Thử Lại**
```bash
npm run seed
```

---

## 🔍 Kiểm Tra IP Hiện Tại

Nếu bạn muốn biết IP của mình là gì:

**Trên Windows (PowerShell)**:
```powershell
(Invoke-WebRequest -Uri "https://api.ipify.org?format=json").Content | ConvertFrom-Json
```

**Hoặc truy cập**:
- https://www.whatismyipaddress.com/
- https://ipify.org/

---

## 📋 Danh Sách IP Whitelist Hiện Tại

Để xem danh sách IP đã thêm:
1. Vào **Network Access** → **IP Whitelist**
2. Xem danh sách các IP được phép kết nối

---

## 🆘 Nếu Vẫn Không Hoạt Động

### **Kiểm Tra 1: Xác Nhận Connection String**
```bash
# Kiểm tra file .env
cat server/.env
```

Đảm bảo `MONGODB_URI` có định dạng:
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### **Kiểm Tra 2: Xác Nhận Username/Password**
1. Vào **Database Access** trong MongoDB Atlas
2. Kiểm tra username và password
3. Nếu quên password, click **Edit** để đặt lại

### **Kiểm Tra 3: Xác Nhận Cluster Name**
1. Vào **Clusters**
2. Kiểm tra tên cluster (trong trường hợp này là `clusterbds`)

### **Kiểm Tra 4: Xác Nhận Database Name**
1. Vào **Clusters** → **Collections**
2. Kiểm tra tên database (trong trường hợp này là `real-estate-db`)

---

## 🔄 Giải Pháp Thay Thế: Sử Dụng MongoDB Local

Nếu bạn muốn chạy MongoDB cục bộ thay vì dùng Atlas:

### **Bước 1: Cài Đặt MongoDB**
- Tải từ: https://www.mongodb.com/try/download/community
- Chọn phiên bản Windows
- Cài đặt theo hướng dẫn

### **Bước 2: Cập Nhật .env**
```properties
PORT=5000
MONGODB_URI=mongodb://localhost:27017/real-estate-db
```

### **Bước 3: Khởi Động MongoDB**
```bash
mongod
```

### **Bước 4: Thử Seed Data**
```bash
npm run seed
```

---

## 📞 Hỗ Trợ Thêm

Nếu vẫn gặp vấn đề:
1. Kiểm tra lại tất cả các bước trên
2. Xóa cache npm: `npm cache clean --force`
3. Cài đặt lại dependencies: `npm install`
4. Thử lại: `npm run seed`

---

**Cập nhật**: 2025-11-25  
**Phiên bản**: 1.0
