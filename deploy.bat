@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ========================================
echo    周易学习平台一键部署工具
echo ========================================
echo.

if "%1"=="" (
    echo 使用方法: deploy.bat [platform]
    echo.
    echo 可用平台:
    echo   vercel    - 部署到 Vercel
    echo   netlify   - 部署到 Netlify
    echo   github    - 部署到 GitHub Pages
    echo   wechat    - 创建微信小程序项目
    echo   all       - 部署到所有网站平台
    echo.
    echo 示例:
    echo   deploy.bat vercel
    echo   deploy.bat all
    echo.
    pause
    exit /b 1
)

echo 正在执行部署...
echo.

node deploy.js %1

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo           部署完成！
    echo ========================================
) else (
    echo.
    echo ========================================
    echo           部署失败！
    echo ========================================
)

echo.
pause