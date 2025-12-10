@echo off
echo ========================================
echo    PUSH CODE LAN DAU TIEN
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

echo [1/7] Kiem tra trang thai...
git status

echo.
echo [2/7] Them tat ca file...
git add .

echo.
set /p commit_msg="Nhap commit message (Enter de dung mac dinh): "
if "%commit_msg%"=="" set commit_msg=Initial commit

echo [3/7] Commit voi message: %commit_msg%
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo.
    echo [WARNING] Khong co thay doi de commit hoac da commit roi.
)

echo.
echo [4/7] Kiem tra remote...
git remote -v | findstr origin >nul 2>&1
if errorlevel 1 (
    echo Chua co remote. Dang them...
    git remote add origin https://github.com/GiangKhung/BCDACN.git
    echo Da them remote origin!
) else (
    echo Da co remote origin!
)

echo.
echo [5/7] Hien thi remote:
git remote -v

echo.
echo [6/7] Kiem tra branch hien tai...
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
echo Branch hien tai: %CURRENT_BRANCH%

if "%CURRENT_BRANCH%"=="" (
    echo Chua co branch. Tao branch main...
    git branch -M main
    set CURRENT_BRANCH=main
)

echo.
echo [7/7] Push code len GitHub (lan dau)...
echo Dang push branch: %CURRENT_BRANCH%
git push -u origin %CURRENT_BRANCH%

if errorlevel 1 (
    echo.
    echo ========================================
    echo    PUSH THAT BAI!
    echo ========================================
    echo.
    echo Co the ban chua dang nhap GitHub.
    echo.
    echo CACH 1: Dung Personal Access Token
    echo --------------------------------
    echo 1. Vao: https://github.com/settings/tokens
    echo 2. Generate new token (classic)
    echo 3. Chon scope: repo
    echo 4. Copy token
    echo 5. Khi Git hoi password, paste token vao
    echo.
    echo CACH 2: Dung GitHub CLI
    echo --------------------------------
    echo 1. Cai dat: winget install --id GitHub.cli
    echo 2. Chay: gh auth login
    echo 3. Lam theo huong dan
    echo.
    echo Sau khi dang nhap, chay lai script nay.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    PUSH THANH CONG!
echo ========================================
echo.
echo Code da duoc push len branch: %CURRENT_BRANCH%
echo Kiem tra tai: https://github.com/GiangKhung/BCDACN
echo.
echo Lan sau chi can chay: push.bat
echo.
pause
