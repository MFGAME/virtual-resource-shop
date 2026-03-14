# 打包所有产品资源

$productsPath = Join-Path $PSScriptRoot "..\products"
$packagesPath = Join-Path $PSScriptRoot "..\packages"

Write-Host "📦 开始打包产品..." -ForegroundColor Green

# 创建打包目录
if (-not (Test-Path $packagesPath)) {
    New-Item -ItemType Directory -Path $packagesPath | Out-Null
}

# 打包ChatGPT Prompt
Write-Host "  📝 打包 ChatGPT Prompt 合集..." -ForegroundColor Cyan
$chatgptSource = Join-Path $productsPath "chatgpt-prompts"
$chatgptDest = Join-Path $packagesPath "ChatGPT-Prompt-合集-v1.0.zip"
if (Test-Path $chatgptSource) {
    Compress-Archive -Path "$chatgptSource\*" -DestinationPath $chatgptDest -Force
    Write-Host "    ✓ 已创建: ChatGPT-Prompt-合集-v1.0.zip" -ForegroundColor Green
}

# 打包Midjourney Prompt
Write-Host "  🎨 打包 Midjourney Prompt 合集..." -ForegroundColor Cyan
$midjourneySource = Join-Path $productsPath "midjourney-prompts"
$midjourneyDest = Join-Path $packagesPath "Midjourney-Prompt-合集-v1.0.zip"
if (Test-Path $midjourneySource) {
    Compress-Archive -Path "$midjourneySource\*" -DestinationPath $midjourneyDest -Force
    Write-Host "    ✓ 已创建: Midjourney-Prompt-合集-v1.0.zip" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ 所有产品打包完成！" -ForegroundColor Green
Write-Host "📂 打包文件位置: $packagesPath" -ForegroundColor Yellow
Write-Host ""

# 列出所有打包文件
$zipFiles = Get-ChildItem -Path $packagesPath -Filter "*.zip"
foreach ($file in $zipFiles) {
    $size = [math]::Round($file.Length / 1MB, 2)
    Write-Host "  • $($file.Name) ($size MB)" -ForegroundColor Gray
}
