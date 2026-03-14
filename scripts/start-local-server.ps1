# 启动本地HTTP服务器
# 用于预览虚拟资源商店

$port = 8080
$websitePath = "$PSScriptRoot\..\website"

Write-Host "🚀 启动本地服务器..." -ForegroundColor Green
Write-Host "📁 网站目录: $websitePath" -ForegroundColor Cyan
Write-Host "🌐 访问地址: http://localhost:$port" -ForegroundColor Yellow
Write-Host ""
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Gray
Write-Host ""

# 使用Python启动HTTP服务器
Set-Location $websitePath
python -m http.server $port
