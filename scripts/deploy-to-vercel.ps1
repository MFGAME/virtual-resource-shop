# 部署到Vercel（需要GitHub账号）

# 检查是否安装了Vercel CLI
Write-Host "🚀 准备部署到Vercel..." -ForegroundColor Green

# 检查Node.js
$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "❌ 未检测到Node.js，请先安装Node.js" -ForegroundColor Red
    Write-Host "   下载地址: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Node.js版本: $nodeVersion" -ForegroundColor Green

# 检查Vercel CLI
$vercelVersion = vercel --version 2>$null
if (-not $vercelVersion) {
    Write-Host "📦 安装Vercel CLI..." -ForegroundColor Cyan
    npm install -g vercel
}

Write-Host "✓ Vercel CLI已就绪" -ForegroundColor Green

Write-Host ""
Write-Host "📋 部署步骤：" -ForegroundColor Yellow
Write-Host "1. 如果没有GitHub账号，请先注册：https://github.com" -ForegroundColor White
Write-Host "2. 登录Vercel（会自动打开浏览器）：vercel login" -ForegroundColor White
Write-Host "3. 部署项目：vercel" -ForegroundColor White
Write-Host ""
Write-Host "💡 或者让我帮你自动部署（需要你的GitHub账号登录）" -ForegroundColor Cyan
Write-Host ""

$deploy = Read-Host "是否现在开始部署？(y/n)"

if ($deploy -eq "y" -or $deploy -eq "Y") {
    Write-Host ""
    Write-Host "🔄 开始部署..." -ForegroundColor Green

    $websitePath = Join-Path $PSScriptRoot "..\website"
    Set-Location $websitePath

    # 部署到Vercel
    vercel --prod

    Write-Host ""
    Write-Host "✅ 部署完成！" -ForegroundColor Green
    Write-Host "🌐 你的网站已经上线！" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "💡 随时可以运行此脚本进行部署" -ForegroundColor Yellow
}
