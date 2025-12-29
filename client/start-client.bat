@echo off
echo ========================================
echo   Starting Client - Port 5173
echo ========================================
echo.

echo [1/2] Checking port 5173...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do (
    echo Found process using port 5173: %%a
    echo Killing process...
    taskkill /PID %%a /F >nul 2>&1
)
echo Port 5173 is now free!
echo.

echo [2/2] Starting client...
echo Client will start at http://localhost:5173
echo Press Ctrl+C to stop
echo.
npm run dev
