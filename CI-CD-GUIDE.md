# 📚 Hướng Dẫn CI/CD - Website Bất Động Sản

## 🎯 Tổng Quan

Dự án sử dụng **GitHub Actions** để tự động hóa quy trình CI/CD với các môi trường:
- **Development** (Local)
- **Staging** (Testing)
- **Production** (Live)

---

## 🔧 Cấu Hình Ban Đầu

### 1. GitHub Secrets

Vào **Settings → Secrets and variables → Actions** và thêm các secrets sau:

#### Docker Hub
```
DOCKER_USERNAME=your-dockerhub-username
DOCKER_PASSWORD=your-dockerhub-password
```

#### Staging Environment
```
STAGING_HOST=staging-server-ip
STAGING_USERNAME=ssh-username
STAGING_SSH_KEY=ssh-private-key
STAGING_URL=https://staging.your-domain.com
```

#### Production Environment
```
PROD_HOST=production-server-ip
PROD_USERNAME=ssh-username
PROD_SSH_KEY=ssh-private-key
PROD_URL=https://your-domain.com
```

#### Database
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
MONGODB_URI_TEST=mongodb+srv://username:password@cluster.mongodb.net/test
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
```

#### Notifications
```
SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### 2. Cấu Hình Server

#### Cài đặt Docker trên Server

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Cài Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Tạo thư mục dự án

```bash
# Staging
sudo mkdir -p /var/www/real-estate-staging
sudo chown $USER:$USER /var/www/real-estate-staging

# Production
sudo mkdir -p /var/www/real-estate-prod
sudo chown $USER:$USER /var/www/real-estate-prod
```

#### Copy file docker-compose

```bash
# Staging
cd /var/www/real-estate-staging
# Upload docker-compose.yml và .env

# Production
cd /var/www/real-estate-prod
# Upload docker-compose.prod.yml, docker-compose.green.yml và .env
```

---

## 🚀 Workflows

### 1. CI - Build and Test (`ci.yml`)

**Trigger:** Push to `develop`, `feature/*`, `hotfix/*` hoặc Pull Request

**Chức năng:**
- ✅ Checkout code
- ✅ Setup Node.js
- ✅ Install dependencies
- ✅ Lint code
- ✅ Run tests
- ✅ Build application
- ✅ Security audit
- ✅ Upload artifacts

**Sử dụng:**
```bash
git checkout develop
git add .
git commit -m "Add new feature"
git push origin develop
```

### 2. Deploy to Staging (`deploy-staging.yml`)

**Trigger:** Push to `develop` branch

**Chức năng:**
- 🐳 Build Docker images
- 📦 Push to Docker Hub
- 🚀 Deploy to staging server
- 🏥 Health check
- 📢 Notify team

**Sử dụng:**
```bash
git checkout develop
git merge feature/new-feature
git push origin develop
# Tự động deploy lên staging
```

### 3. Deploy to Production (`deploy-production.yml`)

**Trigger:** Push to `main` branch hoặc Manual

**Chức năng:**
- 💾 Backup database
- 🐳 Build production images
- 🔵🟢 Blue-Green deployment
- 🏥 Health check
- 🔄 Auto rollback on failure
- 📝 Create GitHub release
- 📢 Notify team

**Sử dụng:**

**Tự động:**
```bash
git checkout main
git merge develop
git push origin main
# Tự động deploy lên production
```

**Thủ công:**
1. Vào **Actions** tab trên GitHub
2. Chọn **Deploy to Production**
3. Click **Run workflow**
4. Nhập version (optional)
5. Click **Run workflow**

### 4. Security Scan (`security-scan.yml`)

**Trigger:** 
- Push to `main`, `develop`
- Pull Request
- Schedule (hàng ngày lúc 2 AM)

**Chức năng:**
- 🔍 npm audit
- 🔐 Secret scanning
- 🐳 Docker image scanning (Trivy)
- 📊 SAST (CodeQL)
- 📢 Notify on critical issues

### 5. Rollback (`rollback.yml`)

**Trigger:** Manual only

**Chức năng:**
- 💾 Backup current state
- 🔄 Rollback to specific version
- 🏥 Health check
- 📢 Notify team

**Sử dụng:**
1. Vào **Actions** tab
2. Chọn **Rollback Production**
3. Click **Run workflow**
4. Nhập:
   - Version to rollback (vd: `20240108-143000`)
   - Reason for rollback
5. Click **Run workflow**

---

## 📊 Branching Strategy

```
main (production)
  ↑
  └── develop (staging)
        ↑
        ├── feature/user-authentication
        ├── feature/property-search
        └── hotfix/fix-login-bug
```

### Quy trình làm việc:

1. **Feature Development**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/new-feature
# Code...
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
# Create Pull Request to develop
```

2. **Hotfix**
```bash
git checkout main
git pull origin main
git checkout -b hotfix/fix-critical-bug
# Fix bug...
git add .
git commit -m "Fix critical bug"
git push origin hotfix/fix-critical-bug
# Create Pull Request to main
```

3. **Release**
```bash
# Merge develop to main
git checkout main
git pull origin main
git merge develop
git push origin main
# Tự động deploy lên production
```

---

## 🐳 Docker Images

### Development
```bash
docker build -t real-estate-client:dev -f client/Dockerfile ./client
docker build -t real-estate-server:dev -f server/Dockerfile ./server
```

### Production
```bash
docker build -t real-estate-client:prod -f client/Dockerfile.prod ./client
docker build -t real-estate-server:prod -f server/Dockerfile.prod ./server
```

### Push to Docker Hub
```bash
docker tag real-estate-client:prod username/real-estate-client:latest
docker tag real-estate-server:prod username/real-estate-server:latest
docker push username/real-estate-client:latest
docker push username/real-estate-server:latest
```

---

## 🔄 Blue-Green Deployment

### Cách hoạt động:

1. **Blue** (Current production) đang chạy trên port 80, 5000
2. **Green** (New version) deploy lên port 8080, 5001
3. Health check Green environment
4. Nếu OK: Switch traffic từ Blue → Green
5. Nếu Fail: Giữ nguyên Blue, xóa Green

### Kiểm tra trạng thái:

```bash
# Check Blue (current)
curl http://your-domain.com/api

# Check Green (new)
curl http://your-domain.com:5001/api
```

---

## 📈 Monitoring & Logging

### Xem logs Docker

```bash
# Staging
cd /var/www/real-estate-staging
docker-compose logs -f

# Production
cd /var/www/real-estate-prod
docker-compose logs -f
```

### Health Check

```bash
# Client
curl http://your-domain.com/health

# Server
curl http://your-domain.com/api
```

### Container Status

```bash
docker-compose ps
docker stats
```

---

## 🔐 Security Best Practices

1. **Không commit secrets** vào Git
2. **Sử dụng environment variables** cho sensitive data
3. **Chạy security scan** thường xuyên
4. **Update dependencies** định kỳ
5. **Review code** trước khi merge
6. **Backup database** trước mỗi deployment
7. **Monitor logs** để phát hiện issues sớm

---

## 🆘 Troubleshooting

### CI/CD Pipeline Failed

1. Check logs trong GitHub Actions
2. Verify secrets configuration
3. Check server connectivity
4. Verify Docker Hub credentials

### Deployment Failed

```bash
# SSH vào server
ssh user@server-ip

# Check Docker status
docker ps -a
docker-compose logs

# Restart services
docker-compose restart

# Rebuild if needed
docker-compose up -d --build
```

### Rollback Failed

```bash
# Manual rollback
cd /var/www/real-estate-prod
docker-compose down
docker pull username/real-estate-client:previous-version
docker pull username/real-estate-server:previous-version
docker-compose up -d
```

### Database Issues

```bash
# Backup
docker-compose exec mongodb mongodump --out /backup/manual-backup

# Restore
docker-compose exec mongodb mongorestore /backup/backup-name
```

---

## 📞 Support

Nếu gặp vấn đề:
1. Check logs trong GitHub Actions
2. Check server logs: `docker-compose logs`
3. Check Slack notifications
4. Contact DevOps team

---

## 📝 Changelog

### Version 1.0.0 (2024-01-08)
- ✅ Initial CI/CD setup
- ✅ GitHub Actions workflows
- ✅ Docker configuration
- ✅ Blue-Green deployment
- ✅ Security scanning
- ✅ Rollback mechanism

---

**Lưu ý:** Đảm bảo đã cấu hình đầy đủ GitHub Secrets trước khi chạy workflows!
