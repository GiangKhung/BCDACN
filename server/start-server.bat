@echo off
echo ========================================
echo   Starting Server - Port 5000
echo ========================================
echo.

echo [1/3] Checking port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
    echo Found process using port 5000: %%a
    echo Killing process...
    taskkill /PID %%a /F >nul 2>&1
)
echo Port 5000 is now free!
echo.

echo [2/3] Checking MongoDB connection...
echo (Skipping - will check on server start)
echo.

echo [3/3] Starting server...
echo Server will start at http://localhost:5000
echo Press Ctrl+C to stop
echo.
npm run dev
