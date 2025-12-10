# Hướng Dẫn Push Code Lên GitHub

## Repository
```
https://github.com/GiangKhung/BCDACN.git
```

## Bước 1: Kiểm Tra Git

Kiểm tra xem Git đã được cài đặt chưa:

```bash
git --version
```

Nếu chưa có, tải Git tại: https://git-scm.com/downloads

## Bước 2: Cấu Hình Git (Lần Đầu)

Nếu chưa cấu hình Git, chạy các lệnh sau:

```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
```

## Bước 3: Kiểm Tra Trạng Thái Repository

### Kiểm tra xem đã có Git repository chưa:

```bash
git status
```

### Nếu chưa có repository (lỗi "not a git repository"):

```bash
# Khởi tạo Git repository
git init

# Thêm remote repository
git remote add origin https://github.com/GiangKhung/BCDACN.git
```

### Nếu đã có repository:

```bash
# Kiểm tra remote
git remote -v

# Nếu chưa có hoặc sai, thêm/sửa remote
git remote add origin https://github.com/GiangKhung/BCDACN.git
# Hoặc nếu đã có nhưng sai:
git remote set-url origin https://github.com/GiangKhung/BCDACN.git
```

## Bước 4: Tạo/Cập Nhật .gitignore

Đảm bảo file `.gitignore` có nội dung sau để không push các file không cần thiết:

```
# Dependencies
node_modules/
client/node_modules/
server/node_modules/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build files
dist/
build/
client/dist/
client/build/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Temporary files
*.tmp
*.temp
```

## Bước 5: Add Files và Commit

### Xem các file đã thay đổi:

```bash
git status
```

### Add tất cả các file:

```bash
git add .
```

### Hoặc add từng file cụ thể:

```bash
git add client/src/pages/AgentDetail.jsx
git add client/src/pages/AgentDetail.css
git add client/src/pages/Directory.jsx
git add HUONG-DAN-TRANG-CHI-TIET-MOI-GIOI.md
```

### Commit với message:

```bash
git commit -m "Thêm trang chi tiết nhà môi giới"
```

Hoặc message chi tiết hơn:

```bash
git commit -m "Thêm trang chi tiết nhà môi giới

- Tạo trang AgentDetail cho công ty và cá nhân
- Thêm 6 cá nhân môi giới mẫu
- Cập nhật Directory với links
- Thêm responsive design
- Tạo file test và hướng dẫn"
```

## Bước 6: Pull Code Mới Nhất (Nếu Có)

Trước khi push, nên pull code mới nhất để tránh conflict:

```bash
# Pull từ branch main
git pull origin main

# Hoặc nếu branch là master
git pull origin master
```

Nếu có conflict, giải quyết conflict rồi commit lại.

## Bước 7: Push Code Lên GitHub

### Push lần đầu:

```bash
# Push và set upstream
git push -u origin main

# Hoặc nếu branch là master
git push -u origin master
```

### Push các lần sau:

```bash
git push
```

## Bước 8: Xác Thực GitHub

Khi push lần đầu, GitHub sẽ yêu cầu xác thực:

### Cách 1: Personal Access Token (Khuyến nghị)

1. Vào GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Chọn scopes: `repo` (full control)
4. Copy token
5. Khi Git yêu cầu password, paste token vào

### Cách 2: GitHub CLI

```bash
# Cài đặt GitHub CLI
# Windows: winget install --id GitHub.cli

# Đăng nhập
gh auth login

# Chọn GitHub.com
# Chọn HTTPS
# Authenticate Git with GitHub credentials: Yes
# Login with a web browser
```

### Cách 3: SSH Key

```bash
# Tạo SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Thêm vào GitHub: Settings → SSH and GPG keys → New SSH key

# Đổi remote sang SSH
git remote set-url origin git@github.com:GiangKhung/BCDACN.git
```

## Các Lệnh Git Hữu Ích

### Xem lịch sử commit:

```bash
git log
git log --oneline
git log --graph --oneline --all
```

### Xem thay đổi:

```bash
git diff
git diff --staged
```

### Hủy thay đổi:

```bash
# Hủy thay đổi chưa add
git checkout -- <file>

# Hủy add
git reset HEAD <file>

# Hủy commit cuối (giữ thay đổi)
git reset --soft HEAD~1

# Hủy commit cuối (xóa thay đổi)
git reset --hard HEAD~1
```

### Tạo branch mới:

```bash
# Tạo và chuyển sang branch mới
git checkout -b feature/agent-detail

# Push branch mới
git push -u origin feature/agent-detail
```

### Merge branch:

```bash
# Chuyển về main
git checkout main

# Merge branch
git merge feature/agent-detail

# Push
git push
```

## Workflow Thông Thường

```bash
# 1. Pull code mới nhất
git pull origin main

# 2. Làm việc và thay đổi code
# ... code code code ...

# 3. Xem thay đổi
git status
git diff

# 4. Add files
git add .

# 5. Commit
git commit -m "Mô tả thay đổi"

# 6. Push
git push origin main
```

## Xử Lý Conflict

Nếu có conflict khi pull hoặc merge:

```bash
# 1. Git sẽ báo conflict
# 2. Mở file conflict, tìm các dòng:
#    <<<<<<< HEAD
#    code của bạn
#    =======
#    code từ remote
#    >>>>>>> branch-name

# 3. Sửa file, giữ lại code đúng

# 4. Add file đã sửa
git add <file>

# 5. Commit
git commit -m "Giải quyết conflict"

# 6. Push
git push
```

## Lưu Ý Quan Trọng

### ⚠️ KHÔNG push các file sau:

- `node_modules/` - Quá lớn, cài lại bằng `npm install`
- `.env` - Chứa thông tin nhạy cảm (API keys, passwords)
- `dist/`, `build/` - File build, tạo lại bằng `npm run build`
- File log, cache

### ✅ NÊN push:

- Source code (`.js`, `.jsx`, `.css`, `.html`)
- File cấu hình (`package.json`, `vite.config.js`)
- File hướng dẫn (`.md`)
- File public (images, fonts)

### 📝 Commit Message Tốt:

```bash
# Tốt
git commit -m "Thêm tính năng tìm kiếm nâng cao"
git commit -m "Fix lỗi hiển thị ảnh trên mobile"
git commit -m "Cập nhật style cho header"

# Không tốt
git commit -m "update"
git commit -m "fix bug"
git commit -m "abc"
```

## Kiểm Tra Sau Khi Push

1. Vào https://github.com/GiangKhung/BCDACN
2. Kiểm tra code đã được push chưa
3. Xem commit history
4. Đảm bảo không có file nhạy cảm

## Troubleshooting

### Lỗi: "Permission denied"

```bash
# Kiểm tra quyền truy cập repository
# Đảm bảo bạn có quyền write
# Hoặc fork repository về account của bạn
```

### Lỗi: "Repository not found"

```bash
# Kiểm tra URL
git remote -v

# Sửa URL nếu sai
git remote set-url origin https://github.com/GiangKhung/BCDACN.git
```

### Lỗi: "Failed to push some refs"

```bash
# Pull trước khi push
git pull origin main --rebase
git push origin main
```

### File quá lớn

```bash
# GitHub giới hạn file 100MB
# Nếu có file lớn, thêm vào .gitignore
# Hoặc dùng Git LFS
```

## Tài Liệu Tham Khảo

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf

---

**Lưu ý:** Thay thế `main` bằng `master` nếu branch chính của repository là `master`.
