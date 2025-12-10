# Git Scripts - Hướng Dẫn Sử Dụng

## 📁 Các File Script

### 1. `setup-git.bat` - Setup Git Repository (Chạy 1 lần đầu tiên)

**Chức năng:**
- Cấu hình Git user (name, email)
- Khởi tạo Git repository (nếu chưa có)
- Thêm/cập nhật remote origin
- Tạo file .gitignore

**Cách dùng:**
```bash
# Double-click file setup-git.bat
# Hoặc chạy trong terminal:
setup-git.bat
```

**Khi nào dùng:**
- Lần đầu tiên setup project
- Khi chưa có Git repository
- Khi cần cấu hình lại Git

---

### 2. `first-push.bat` - Push Lần Đầu Tiên (Chạy 1 lần)

**Chức năng:**
- Tự động phát hiện branch (main/master)
- Tạo branch mới nếu cần
- Push lần đầu với đúng branch
- Hướng dẫn xác thực nếu lỗi

**Cách dùng:**
```bash
# Double-click file first-push.bat
# Hoặc chạy trong terminal:
first-push.bat
```

**Khi nào dùng:**
- Lần đầu tiên push code lên GitHub
- Khi gặp lỗi "couldn't find remote ref main"
- Khi repository trống

---

### 3. `push.bat` - Push Code Lên GitHub (Dùng thường xuyên)

**Chức năng:**
- Kiểm tra trạng thái Git
- Add tất cả file thay đổi
- Commit với message
- Pull code mới nhất
- Push lên GitHub

**Cách dùng:**
```bash
# Double-click file push.bat
# Hoặc chạy trong terminal:
push.bat
```

**Khi nào dùng:**
- Sau khi code xong muốn push lên GitHub
- Mỗi khi có thay đổi cần lưu

---

### 4. `check-status.bat` - Kiểm Tra Trạng Thái

**Chức năng:**
- Hiển thị phiên bản Git
- Hiển thị cấu hình user
- Hiển thị trạng thái repository
- Hiển thị remote và branches
- Hiển thị commit gần nhất

**Cách dùng:**
```bash
check-status.bat
```

**Khi nào dùng:**
- Khi muốn kiểm tra trạng thái Git
- Khi gặp lỗi và cần debug
- Trước khi push để đảm bảo mọi thứ OK

---

### 5. `HUONG-DAN-PUSH-GITHUB.md` - Hướng Dẫn Chi Tiết

**Nội dung:**
- Hướng dẫn từng bước push code
- Các lệnh Git cơ bản
- Xử lý lỗi thường gặp
- Best practices

**Khi nào đọc:**
- Muốn hiểu rõ Git hoạt động như thế nào
- Gặp lỗi khi push
- Muốn dùng lệnh Git thủ công

---

### 6. `FIX-PUSH-ERROR.md` - Hướng Dẫn Sửa Lỗi

**Nội dung:**
- Giải quyết lỗi "couldn't find remote ref main"
- Giải quyết lỗi "Permission denied"
- Giải quyết các lỗi thường gặp
- Debug commands

**Khi nào đọc:**
- Khi gặp lỗi push
- Khi cần xác thực GitHub
- Khi cần debug Git

---

## 🚀 Quick Start

### Lần Đầu Tiên:

1. **Chạy setup:**
   ```bash
   setup-git.bat
   ```
   - Nhập tên và email
   - Script sẽ tự động setup mọi thứ

2. **Push code lần đầu:**
   ```bash
   first-push.bat
   ```
   - Nhập commit message
   - Script sẽ tự động push
   - Nếu lỗi, làm theo hướng dẫn

### Các Lần Sau:

Chỉ cần chạy:
```bash
push.bat
```

### Khi Gặp Lỗi:

```bash
# Kiểm tra trạng thái
check-status.bat

# Đọc hướng dẫn sửa lỗi
# Mở file: FIX-PUSH-ERROR.md
```

---

## 📝 Workflow Thông Thường

```
1. Code xong
   ↓
2. Chạy push.bat
   ↓
3. Nhập commit message
   ↓
4. Đợi push xong
   ↓
5. Kiểm tra trên GitHub
```

---

## ⚠️ Lưu Ý Quan Trọng

### Trước Khi Push:

✅ **NÊN:**
- Kiểm tra code đã chạy đúng chưa
- Xóa các file test không cần thiết
- Đảm bảo không có thông tin nhạy cảm (passwords, API keys)
- Viết commit message rõ ràng

❌ **KHÔNG NÊN:**
- Push khi code đang lỗi
- Push file `.env` chứa thông tin nhạy cảm
- Push thư mục `node_modules/`
- Commit message không rõ ràng ("update", "fix")

### File Không Push (Đã có trong .gitignore):

- `node_modules/` - Thư mục dependencies
- `.env` - File chứa API keys, passwords
- `dist/`, `build/` - File build
- `*.log` - File log
- `.DS_Store`, `Thumbs.db` - File hệ thống

---

## 🔧 Xử Lý Lỗi

### Lỗi 1: "Git is not recognized"

**Nguyên nhân:** Chưa cài Git

**Giải pháp:**
1. Tải Git: https://git-scm.com/downloads
2. Cài đặt Git
3. Restart terminal
4. Chạy lại script

---

### Lỗi 2: "Permission denied"

**Nguyên nhân:** Chưa đăng nhập GitHub hoặc không có quyền

**Giải pháp:**

**Cách 1: Personal Access Token**
1. Vào GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Chọn scope: `repo`
5. Copy token
6. Khi push, dùng token làm password

**Cách 2: GitHub CLI**
```bash
# Cài GitHub CLI
winget install --id GitHub.cli

# Đăng nhập
gh auth login
```

---

### Lỗi 3: "Failed to push some refs"

**Nguyên nhân:** Code trên GitHub mới hơn code local

**Giải pháp:**
```bash
# Pull trước khi push
git pull origin main --rebase
git push origin main
```

---

### Lỗi 4: "Conflict"

**Nguyên nhân:** Code local và remote có thay đổi trùng nhau

**Giải pháp:**
1. Mở file conflict
2. Tìm các dòng:
   ```
   <<<<<<< HEAD
   code của bạn
   =======
   code từ remote
   >>>>>>> main
   ```
3. Sửa file, giữ code đúng
4. Chạy:
   ```bash
   git add .
   git commit -m "Giải quyết conflict"
   git push
   ```

---

### Lỗi 5: "Repository not found"

**Nguyên nhân:** URL repository sai

**Giải pháp:**
```bash
# Kiểm tra URL
git remote -v

# Sửa URL
git remote set-url origin https://github.com/GiangKhung/BCDACN.git
```

---

## 📚 Lệnh Git Hữu Ích

### Xem trạng thái:
```bash
git status
```

### Xem lịch sử:
```bash
git log
git log --oneline
```

### Xem thay đổi:
```bash
git diff
```

### Hủy thay đổi:
```bash
# Hủy thay đổi chưa commit
git checkout -- <file>

# Hủy commit cuối (giữ thay đổi)
git reset --soft HEAD~1
```

### Tạo branch:
```bash
git checkout -b feature/new-feature
```

### Xem remote:
```bash
git remote -v
```

---

## 🎯 Best Practices

### Commit Message Tốt:

✅ **Tốt:**
```
git commit -m "Thêm trang chi tiết nhà môi giới"
git commit -m "Fix lỗi hiển thị ảnh trên mobile"
git commit -m "Cập nhật style cho header"
git commit -m "Thêm validation cho form đăng tin"
```

❌ **Không tốt:**
```
git commit -m "update"
git commit -m "fix"
git commit -m "abc"
git commit -m "done"
```

### Commit Thường Xuyên:

- Commit sau mỗi tính năng hoàn thành
- Commit trước khi nghỉ
- Commit trước khi thử nghiệm thay đổi lớn

### Pull Trước Khi Push:

```bash
git pull origin main
# Làm việc
git add .
git commit -m "Message"
git push origin main
```

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:

1. Đọc file `HUONG-DAN-PUSH-GITHUB.md`
2. Google lỗi cụ thể
3. Hỏi trên Stack Overflow
4. Xem Git documentation: https://git-scm.com/doc

---

## 🔗 Links Hữu Ích

- Repository: https://github.com/GiangKhung/BCDACN
- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf

---

**Chúc bạn code vui vẻ! 🚀**
