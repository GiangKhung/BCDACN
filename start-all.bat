@echo off
echo ========================================
echo   Starting Development Environment
echo ========================================
echo.

echo Killing processes on ports 5000 and 5173...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do taskkill /PID %%a /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do taskkill /PID %%a /F >nul 2>&1
echo Ports are now free!
echo.

echo Starting Server (port 5000)...
start "Server - Port 5000" cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Client (port 5173)...
start "Client - Port 5173" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo   Development Environment Started!
echo ========================================
echo.
echo Server: http://localhost:5000
echo Client: http://localhost:5173
echo.
echo Two terminal windows have been opened.
echo Close them to stop the servers.
echo.
pause
