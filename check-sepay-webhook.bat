@echo off
echo ========================================
echo    KIEM TRA SEPAY WEBHOOK
echo ========================================
echo.

echo 1. Kiem tra server dang chay...
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Server chua chay! Vui long chay: cd server ^&^& npm run dev
    pause
    exit /b 1
)
echo [OK] Server dang chay

echo.
echo 2. Nhap Payment ID de kiem tra:
set /p PAYMENT_ID="Payment ID: "

if "%PAYMENT_ID%"=="" (
    echo [X] Vui long nhap Payment ID!
    pause
    exit /b 1
)

echo.
echo 3. Kiem tra trang thai thanh toan...
curl -s http://localhost:5000/api/sepay/check-payment/%PAYMENT_ID%

echo.
echo.
echo 4. Ban co muon test webhook khong? (Y/N)
set /p TEST_WEBHOOK="Test webhook (Y/N): "

if /i "%TEST_WEBHOOK%"=="Y" (
    echo.
    set /p AMOUNT="Nhap so tien (VND): "
    echo.
    echo Dang gui test webhook...
    curl -X POST http://localhost:5000/api/sepay/test-webhook ^
         -H "Content-Type: application/json" ^
         -d "{\"paymentId\":\"%PAYMENT_ID%\",\"amount\":%AMOUNT%}"
    echo.
)

echo.
echo ========================================
pause
