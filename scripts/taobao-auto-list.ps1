# 淘宝自动上架脚本（需要先登录淘宝账号）
# 使用浏览器自动化工具

param(
    [string]$ProductType = "chatgpt"  # chatgpt, midjourney, combo
)

Write-Host "🛒 淘宝自动上架脚本" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  注意事项：" -ForegroundColor Yellow
Write-Host "1. 请先在浏览器中登录淘宝卖家中心" -ForegroundColor White
Write-Host "2. 确保已经通过实名认证" -ForegroundColor White
Write-Host "3. 确保有发布商品的权限" -ForegroundColor White
Write-Host ""

# 产品信息
$products = @{
    "chatgpt" = @{
        Title = "ChatGPT提示词大全 1000+高质量AI对话模板 编程写作商务学习"
        Price = "29.90"
        Description = "ChatGPT Prompt合集，包含1000+精选对话模板，覆盖编程、写作、商务、学习全场景。持续更新，永久免费。Notion + Markdown双格式，新手友好。"
    }
    "midjourney" = @{
        Title = "Midjourney绘图提示词大全 500+AI绘画模板 人物场景产品设计"
        Price = "39.90"
        Description = "Midjourney Prompt合集，包含500+精选绘图模板，覆盖人物、场景、产品、艺术风格。参数详解，进阶技巧，持续更新。"
    }
    "combo" = @{
        Title = "AI提示词合集 ChatGPT+Midjourney双剑合璧 编程绘画全覆盖"
        Price = "59.90"
        Description = "超级组合套餐！ChatGPT + Midjourney完整合集，未来新产品免费更新，1对1指导服务，专属用户群。"
    }
}

$product = $products[$ProductType]

if (-not $product) {
    Write-Host "❌ 产品类型错误，请选择: chatgpt, midjourney, combo" -ForegroundColor Red
    exit 1
}

Write-Host "📦 产品信息：" -ForegroundColor Cyan
Write-Host "   名称: $($product.Title)" -ForegroundColor White
Write-Host "   价格: ¥$($product.Price)" -ForegroundColor White
Write-Host ""

Write-Host "🌐 即将打开淘宝卖家中心..." -ForegroundColor Yellow
Write-Host "   请在浏览器中完成上架流程" -ForegroundColor White
Write-Host ""
Write-Host "📝 商品信息已准备好，可以直接复制粘贴" -ForegroundColor Green
Write-Host ""

# 打开淘宝卖家中心
Start-Process "https://sell.taobao.com/auction/goods/publish.htm"

# 将商品信息复制到剪贴板
$productInfo = @"
标题：$($product.Title)
价格：¥$($product.Price)
描述：$($product.Description)
"@

Set-Clipboard -Value $productInfo
Write-Host "✅ 商品信息已复制到剪贴板！" -ForegroundColor Green
Write-Host "   直接粘贴使用即可" -ForegroundColor White
Write-Host ""
Write-Host "💡 上架建议：" -ForegroundColor Cyan
Write-Host "   - 选择类目：虚拟商品 > 软件/程序 > 其他软件" -ForegroundColor White
Write-Host "   - 发货方式：自动发货（填写网盘链接）" -ForegroundColor White
Write-Host "   - 库存：999（虚拟商品不限）" -ForegroundColor White
