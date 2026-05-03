@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ========================================
echo    周易学习平台快速部署菜单
echo ========================================
echo.
echo 请选择部署选项:
echo.
echo 1. 部署到 Vercel
echo 2. 部署到 Netlify
echo 3. 部署到 GitHub Pages
echo 4. 创建微信小程序项目
echo 5. 部署到所有网站平台
echo 6. 查看部署状态
echo 7. 安装部署依赖
echo 8. 退出
echo.
set /p choice=请输入选项 (1-8): 

if "%choice%"=="1" (
    echo.
    echo 正在部署到 Vercel...
    node deploy.js vercel
    goto end
)

if "%choice%"=="2" (
    echo.
    echo 正在部署到 Netlify...
    node deploy.js netlify
    goto end
)

if "%choice%"=="3" (
    echo.
    echo 正在部署到 GitHub Pages...
    node deploy.js github
    goto end
)

if "%choice%"=="4" (
    echo.
    echo 正在创建微信小程序项目...
    node deploy.js wechat
    goto end
)

if "%choice%"=="5" (
    echo.
    echo 正在部署到所有网站平台...
    node deploy.js all
    goto end
)

if "%choice%"=="6" (
    echo.
    echo 检查部署状态...
    echo.
    echo 项目构建状态:
    if exist "build" (
        echo   ✓ 构建文件夹存在
        for /f %%i in ('dir /b build\*.* 2^>nul ^| find /c /v ""') do echo   ✓ 包含 %%i 个文件
    ) else (
        echo   ✗ 构建文件夹不存在，请先运行构建
    )
    echo.
    echo 微信小程序项目状态:
    if exist "wechat-miniprogram" (
        echo   ✓ 微信小程序项目已创建
        if exist "wechat-miniprogram\app.json" (
            echo   ✓ 配置文件完整
        ) else (
            echo   ✗ 配置文件缺失
        )
    ) else (
        echo   ✗ 微信小程序项目未创建
    )
    echo.
    echo 依赖状态:
    npm list --depth=0 2>nul | findstr "gh-pages\|webpack-bundle-analyzer\|npm-check-updates"
    goto end
)

if "%choice%"=="7" (
    echo.
    echo 正在安装部署依赖...
    npm install
    echo.
    echo 安装全局部署工具...
    echo 注意：可能需要管理员权限
    npm install -g vercel netlify-cli
    goto end
)

if "%choice%"=="8" (
    echo.
    echo 退出部署工具
    goto exit
)

echo.
echo 无效选项，请重新选择
pause
goto start

:end
echo.
echo ========================================
echo           操作完成！
echo ========================================
echo.
echo 按任意键返回菜单或关闭窗口退出
pause >nul
goto start

:exit
exit /b 0

:start
cls
goto :eof