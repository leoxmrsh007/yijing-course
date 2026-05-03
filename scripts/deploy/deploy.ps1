param(
    [string]$Platform
)

Write-Host ""
Write-Host "Yijing Learning Platform One-Click Deployment Tool" -ForegroundColor Magenta
Write-Host ""

if (-not $Platform) {
    Write-Host "Usage: .\deploy.ps1 -Platform [platform]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Available platforms:"
    Write-Host "  vercel    - Deploy to Vercel"
    Write-Host "  netlify   - Deploy to Netlify"
    Write-Host "  github    - Deploy to GitHub Pages"
    Write-Host "  wechat    - Create WeChat Mini Program project"
    Write-Host "  all       - Deploy to all web platforms"
    Write-Host ""
    Write-Host "Examples:"
    Write-Host "  .\deploy.ps1 -Platform vercel"
    Write-Host "  .\deploy.ps1 -Platform all"
    Write-Host ""
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "[SUCCESS] Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not installed" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "[SUCCESS] npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] npm is not installed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[INFO] Executing: node deploy.js $Platform" -ForegroundColor Blue

# Execute the Node.js deployment script
try {
    node deploy.js $Platform
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] Deployment completed successfully!" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Deployment failed with exit code: $LASTEXITCODE" -ForegroundColor Red
        exit $LASTEXITCODE
    }
} catch {
    Write-Host "[ERROR] Deployment failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}