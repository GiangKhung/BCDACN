# Hướng Dẫn Sửa Lỗi Push GitHub

## Lỗi: "couldn't find remote ref main"

### Nguyên Nhân

Repository trên GitHub:
- Chưa có branch `main` 
- Có thể branch chính là `master`
- Hoặc repository còn hoàn toàn trống

### Giải Pháp

#### Cách 1: Dùng Script Tự Động (Khuyến nghị)

Chạy script mới cho lần push đầu tiên:

```bash
first-push.bat
```

Script này sẽ:
- Tự động phát hiện branch
- Tạo branch mới nếu cần
- Push lần đầu với đúng branch

#### Cách 2: Thủ Công

**Bước 1: Kiểm tra branch hiện tại**

```bash
git branch
```

**Bước 2: Kiểm tra remote branch**

```bash
git branch -r
```

**Bước 3: Tùy theo kết quả**

##### Trường hợp A: Repository trống (không có branch nào)

```bash
# Tạo branch main
git branch -M main

# Push lần đầu
git push -u origin main
```

##### Trường hợp B: Repository có branch master

```bash
# Chuyển sang master
git checkout master

# Hoặc đổi tên branch hiện tại thành master
git branch -M master

# Push
git push -u origin master
```

##### Trường hợp C: Muốn dùng main nhưng remote có master

```bash
# Đổi tên branch local thành main
git branch -M main

# Push và tạo branch main trên remote
git push -u origin main

# (Tùy chọn) Xóa branch master trên remote
git push origin --delete master
```

#### Cách 3: Kiểm tra và sửa

**Bước 1: Chạy script kiểm tra**

```bash
check-status.bat
```

**Bước 2: Xem thông tin**

Script sẽ hiển thị:
- Branch hiện tại
- Remote branches
- Trạng thái repository

**Bước 3: Quyết định**

Dựa vào thông tin, chọn giải pháp phù hợp ở trên.

---

## Các Lỗi Khác

### Lỗi: "Permission denied"

**Nguyên nhân:** Chưa xác thực với GitHub

**Giải pháp:**

#### Option 1: Personal Access Token (Dễ nhất)

1. Vào: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Đặt tên: "BCDACN Project"
4. Chọn scope: ✅ `repo` (full control of private repositories)
5. Click "Generate token"
6. **QUAN TRỌNG:** Copy token ngay (chỉ hiện 1 lần)
7. Khi Git hỏi password, paste token vào

**Lưu token để dùng lại:**
```bash
# Windows Credential Manager sẽ tự lưu sau lần đầu
```

#### Option 2: GitHub CLI (Tiện lợi)

```bash
# Cài đặt
winget install --id GitHub.cli

# Đăng nhập
gh auth login

# Chọn:
# - GitHub.com
# - HTTPS
# - Yes (authenticate Git)
# - Login with a web browser
```

#### Option 3: SSH Key (Bảo mật cao)

```bash
# Tạo SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
type %USERPROFILE%\.ssh\id_ed25519.pub

# Thêm vào GitHub:
# Settings → SSH and GPG keys → New SSH key

# Đổi remote sang SSH
git remote set-url origin git@github.com:GiangKhung/BCDACN.git
```

---

### Lỗi: "Repository not found"

**Nguyên nhân:** URL sai hoặc không có quyền truy cập

**Giải pháp:**

```bash
# Kiểm tra URL
git remote -v

# Sửa URL nếu sai
git remote set-url origin https://github.com/GiangKhung/BCDACN.git

# Kiểm tra lại
git remote -v
```

---

### Lỗi: "Failed to push some refs"

**Nguyên nhân:** Remote có code mới hơn local

**Giải pháp:**

```bash
# Pull trước
git pull origin main --rebase

# Nếu có conflict, giải quyết rồi:
git add .
git rebase --continue

# Push
git push origin main
```

---

### Lỗi: "Large files"

**Nguyên nhân:** File quá lớn (>100MB)

**Giải pháp:**

```bash
# Tìm file lớn
git ls-files | xargs ls -lh | sort -k5 -hr | head -10

# Xóa file khỏi Git
git rm --cached <file-lon>

# Thêm vào .gitignore
echo <file-lon> >> .gitignore

# Commit và push
git add .gitignore
git commit -m "Remove large file"
git push
```

---

## Workflow Đúng Cho Lần Đầu

### Bước 1: Setup (1 lần duy nhất)

```bash
setup-git.bat
```

### Bước 2: Push lần đầu

```bash
first-push.bat
```

### Bước 3: Các lần sau

```bash
push.bat
```

---

## Kiểm Tra Trước Khi Push

### Checklist:

```bash
# 1. Kiểm tra trạng thái
check-status.bat

# 2. Xem file thay đổi
git status

# 3. Xem nội dung thay đổi
git diff

# 4. Đảm bảo không có file nhạy cảm
# Kiểm tra .env, passwords, API keys

# 5. Test code
# Chạy npm run dev, kiểm tra lỗi

# 6. Push
first-push.bat  # Lần đầu
# hoặc
push.bat        # Các lần sau
```

---

## Debug Commands

### Xem log chi tiết:

```bash
# Xem lịch sử commit
git log --oneline --graph --all

# Xem remote
git remote -v

# Xem branch
git branch -a

# Xem config
git config --list
```

### Reset nếu cần:

```bash
# Hủy commit cuối (giữ thay đổi)
git reset --soft HEAD~1

# Hủy tất cả thay đổi chưa commit
git reset --hard HEAD

# Xóa file chưa track
git clean -fd
```

---

## Liên Hệ Hỗ Trợ

Nếu vẫn gặp lỗi:

1. Chạy `check-status.bat` và chụp màn hình
2. Copy toàn bộ thông báo lỗi
3. Tìm kiếm lỗi trên Google
4. Hỏi trên Stack Overflow với tag `git`

---

## Quick Reference

| Lỗi | Script | Lệnh Thủ Công |
|-----|--------|---------------|
| Lần đầu push | `first-push.bat` | `git push -u origin main` |
| Không tìm thấy branch | `first-push.bat` | `git branch -M main` |
| Permission denied | Xem hướng dẫn trên | Dùng token/SSH |
| Repository not found | `setup-git.bat` | `git remote set-url origin <url>` |
| Kiểm tra trạng thái | `check-status.bat` | `git status` |

---

**Lưu ý:** Sau khi push thành công lần đầu, các lần sau chỉ cần dùng `push.bat`
