# Hướng Dẫn Start Development Server

## 🚀 Quick Start

### Cách 1: Chạy Thủ Công (Khuyến nghị)

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```

Server sẽ chạy tại: http://localhost:5000

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

Client sẽ chạy tại: http://localhost:5173

### Cách 2: Dùng Script (Windows)

Tạo file `start-dev.bat`:
```batch
@echo off
echo Starting Development Servers...

start "Server" cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak > nul
start "Client" cmd /k "cd client && npm run dev"

echo.
echo Servers are starting...
echo Server: http://localhost:5000
echo Client: http://localhost:5173
```

Chạy:
```bash
start-dev.bat
```

## 📋 Checklist Trước Khi Start

### 1. Kiểm Tra Dependencies

```bash
# Server
cd server
npm install

# Client
cd client
npm install
```

### 2. Kiểm Tra MongoDB

**Option A - MongoDB Atlas:**
```bash
cd server
node scripts/testConnection.js
```

Nếu lỗi timeout → Whitelist IP trên MongoDB Atlas (xem `FIX-MONGODB-TIMEOUT.md`)

**Option B - MongoDB Local:**
```bash
# Kiểm tra MongoDB service
net start MongoDB

# Hoặc mở Services (Win + R → services.msc)
# Tìm "MongoDB Server" → Start
```

### 3. Kiểm Tra .env

File `server/.env` phải có:
```env
PORT=5000
MONGODB_URI=mongodb+srv://admin:VrH88PmVm5xodYYM@clusterbds.pjnkt12.mongodb.net/real-estate-db?retryWrites=true&w=majority&appName=ClusterBDS
JWT_SECRET=batdongsan_secret_key_2024_very_secure_random_string
```

### 4. Seed Dữ Liệu (Lần đầu)

```bash
cd server

# Tạo admin
node scripts/createAdmin.js

# Seed properties & projects
node scripts/seedData.js
```

## 🔧 Troubleshooting

### Lỗi: "Cannot find module 'auth.js'"

**Đã fix!** File `server/middleware/auth.js` đã được tạo.

### Lỗi: "EADDRINUSE" (Port đã được dùng)

**Server (port 5000):**
```bash
# Tìm process đang dùng port
netstat -ano | findstr :5000

# Kill process (thay PID)
taskkill /PID <PID> /F
```

**Client (port 5173):**
```bash
# Tìm process
netstat -ano | findstr :5173

# Kill process
taskkill /PID <PID> /F
```

### Lỗi: MongoDB Connection

**Giải pháp:**
1. Xem `FIX-MONGODB-TIMEOUT.md`
2. Whitelist IP trên MongoDB Atlas
3. Hoặc dùng MongoDB local

### Lỗi: "Module not found"

```bash
# Cài lại dependencies
cd server
rm -rf node_modules package-lock.json
npm install

cd ../client
rm -rf node_modules package-lock.json
npm install
```

## 📊 Kiểm Tra Server Hoạt Động

### 1. Test API

**Server health:**
```
http://localhost:5000/
```

**Properties API:**
```
http://localhost:5000/api/properties
```

**Projects API:**
```
http://localhost:5000/api/projects
```

### 2. Test Client

**Trang chủ:**
```
http://localhost:5173/
```

**Đăng nhập:**
```
http://localhost:5173/login
Email: admin@batdongsan.com
Password: admin123456
```

**Admin panel:**
```
http://localhost:5173/admin
```

## 🎯 Development Workflow

### 1. Start Servers

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

### 2. Làm Việc

- Edit code
- Server tự động restart (nodemon)
- Client tự động reload (Vite HMR)

### 3. Test

- Mở browser: http://localhost:5173
- Kiểm tra console (F12)
- Test các tính năng

### 4. Commit Code

```bash
# Dùng script có sẵn
quick-push.bat

# Hoặc thủ công
git add .
git commit -m "Your message"
git push origin master
```

## 📝 Các Lệnh Hữu Ích

### Server

```bash
cd server

# Development (auto-restart)
npm run dev

# Production
npm start

# Test connection
node scripts/testConnection.js

# Create admin
node scripts/createAdmin.js

# Seed data
node scripts/seedData.js
```

### Client

```bash
cd client

# Development
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 🔄 Reset & Restart

### Soft Reset (Giữ dữ liệu)

```bash
# Ctrl + C để stop servers
# Sau đó start lại
cd server && npm run dev
cd client && npm run dev
```

### Hard Reset (Xóa dữ liệu)

```bash
# Stop servers
# Seed lại dữ liệu
cd server
node scripts/seedData.js

# Start lại
npm run dev
```

## 🌐 URLs Quan Trọng

### Development

- **Client:** http://localhost:5173
- **Server:** http://localhost:5000
- **API Docs:** http://localhost:5000/

### Pages

- **Home:** http://localhost:5173/
- **Login:** http://localhost:5173/login
- **Register:** http://localhost:5173/register
- **For Sale:** http://localhost:5173/for-sale
- **Projects:** http://localhost:5173/projects
- **Admin:** http://localhost:5173/admin
- **Profile:** http://localhost:5173/profile
- **Post Property:** http://localhost:5173/post-property

## 💡 Tips

1. **Dùng 2 terminals** - Một cho server, một cho client
2. **Kiểm tra console** - Xem logs để debug
3. **Test API trước** - Đảm bảo backend hoạt động
4. **Seed data đầu tiên** - Có dữ liệu để test
5. **Dùng admin account** - Test đầy đủ tính năng

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Đọc error message trong console
2. Kiểm tra các file hướng dẫn:
   - `FIX-MONGODB-TIMEOUT.md`
   - `HUONG-DAN-SEED-DATA.md`
   - `HUONG-DAN-ADMIN.md`
3. Restart servers
4. Xóa node_modules và cài lại

---

**Happy Coding! 🚀**
