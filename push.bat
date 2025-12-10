@echo off
echo ========================================
echo    PUSH CODE LEN GITHUB
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

echo [1/6] Kiem tra trang thai...
git status

echo.
echo [2/6] Them tat ca file...
git add .

echo.
set /p commit_msg="Nhap commit message (Enter de dung mac dinh): "
if "%commit_msg%"=="" set commit_msg=Cap nhat code

echo [3/6] Commit voi message: %commit_msg%
git commit -m "%commit_msg%"

echo.
echo [4/6] Kiem tra remote...
git remote -v

echo.
echo [5/6] Pull code moi nhat...
git pull origin main
if errorlevel 1 (
    echo.
    echo [WARNING] Co the co conflict. Vui long giai quyet conflict roi chay lai script.
    pause
    exit /b 1
)

echo.
echo [6/6] Push code len GitHub...
git push origin main
if errorlevel 1 (
    echo.
    echo [ERROR] Push that bai! 
    echo Kiem tra:
    echo - Da dang nhap GitHub chua?
    echo - Co quyen write vao repository khong?
    echo - URL remote co dung khong?
    pause
    exit /b 1
)

echo.
echo ========================================
echo    PUSH THANH CONG!
echo ========================================
echo.
echo Kiem tra tai: https://github.com/GiangKhung/BCDACN
echo.
pause
