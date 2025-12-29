@echo off
echo ========================================
echo    PUSH NHANH
echo ========================================
echo.

REM Lay branch hien tai
for /f "tokens=*" %%i in ('git branch --show-current') do set BRANCH=%%i

if "%BRANCH%"=="" (
    echo [ERROR] Khong tim thay branch!
    pause
    exit /b 1
)

echo Branch hien tai: %BRANCH%
echo.

REM Add va commit
git add .
git commit -m "Update code"

REM Push
echo Dang push len origin/%BRANCH%...
git push origin %BRANCH%

if errorlevel 1 (
    echo.
    echo [ERROR] Push that bai!
    echo.
    echo Thu chay lenh nay:
    echo git push -u origin %BRANCH%
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    PUSH THANH CONG!
echo ========================================
echo.
pause
