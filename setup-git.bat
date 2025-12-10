@echo off
echo ========================================
echo    SETUP GIT REPOSITORY
echo ========================================
echo.

REM Kiem tra Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git chua duoc cai dat!
    echo Tai Git tai: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo [1/5] Cau hinh Git user...
set /p git_name="Nhap ten cua ban: "
set /p git_email="Nhap email cua ban: "

git config --global user.name "%git_name%"
git config --global user.email "%git_email%"

echo.
echo Da cau hinh:
git config --global user.name
git config --global user.email

echo.
echo [2/5] Kiem tra Git repository...
git status >nul 2>&1
if errorlevel 1 (
    echo Chua co Git repository. Dang khoi tao...
    git init
    echo Da khoi tao Git repository!
) else (
    echo Da co Git repository!
)

echo.
echo [3/5] Kiem tra remote...
git remote -v | findstr origin >nul 2>&1
if errorlevel 1 (
    echo Chua co remote. Dang them remote...
    git remote add origin https://github.com/GiangKhung/BCDACN.git
    echo Da them remote origin!
) else (
    echo Da co remote origin!
    echo Dang cap nhat URL...
    git remote set-url origin https://github.com/GiangKhung/BCDACN.git
    echo Da cap nhat remote URL!
)

echo.
echo [4/5] Hien thi remote:
git remote -v

echo.
echo [5/5] Tao .gitignore...
if not exist .gitignore (
    (
        echo # Dependencies
        echo node_modules/
        echo client/node_modules/
        echo server/node_modules/
        echo.
        echo # Environment variables
        echo .env
        echo .env.local
        echo .env.development.local
        echo .env.test.local
        echo .env.production.local
        echo.
        echo # Build files
        echo dist/
        echo build/
        echo client/dist/
        echo client/build/
        echo.
        echo # Logs
        echo logs/
        echo *.log
        echo npm-debug.log*
        echo.
        echo # OS files
        echo .DS_Store
        echo Thumbs.db
        echo.
        echo # IDE
        echo .vscode/
        echo .idea/
        echo *.swp
        echo.
        echo # Temporary files
        echo *.tmp
        echo *.temp
    ) > .gitignore
    echo Da tao file .gitignore!
) else (
    echo File .gitignore da ton tai!
)

echo.
echo ========================================
echo    SETUP HOAN TAT!
echo ========================================
echo.
echo Ban co the chay 'push.bat' de push code len GitHub
echo.
pause
