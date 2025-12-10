@echo off
echo ========================================
echo    KIEM TRA TRANG THAI GIT
echo ========================================
echo.

REM Kiem tra Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git chua duoc cai dat!
    pause
    exit /b 1
)

echo [1] Phien ban Git:
git --version
echo.

echo [2] Cau hinh Git user:
git config user.name
git config user.email
echo.

echo [3] Trang thai repository:
git status
echo.

echo [4] Remote repositories:
git remote -v
echo.

echo [5] Branch hien tai:
git branch
echo.

echo [6] Branch tren remote:
git branch -r
echo.

echo [7] Commit gan nhat:
git log --oneline -5
echo.

echo ========================================
pause
