# 闲鱼自动上架脚本（需要先登录闲鱼账号）

param(
    [string]$ProductType = "chatgpt"  # chatgpt, midjourney, combo
)

Write-Host "🛒 闲鱼自动上架脚本" -ForegroundColor Green
Write-Host ""

# 产品信息（闲鱼价格稍低）
$products = @{
    "chatgpt" = @{
        Title = "ChatGPT提示词合集 AI对话模板 编程写作效率神器"
        Price = "25"
        Description = @"


✨ ChatGPT Prompt合集 ✨

📦 包含内容：
• 1000+ 精选对话模板
• 编程、写作、商务、学习全覆盖
• 持续更新，永久免费
• Notion + Markdown双格式

💡 适用场景：
• 程序员：代码生成、Bug调试
• 文案：创意写作、内容营销
• 学生：论文写作、学习辅导
• 职场：邮件、报告、PPT

🎁 拍下即发，自动发货！
🎁 电子商品，售出不退！

有需要随时问我~
"@
    }
    "midjourney" = @{
        Title = "Midjourney绘图提示词 AI绘画模板 人物场景设计"
        Price = "35"
        Description = @"


✨ Midjourney Prompt合集 ✨

📦 包含内容：
• 500+ 精选绘图模板
• 人物、场景、产品、艺术风格
• 参数详解，进阶技巧
• 持续更新，永久免费

💡 适用场景：
• 设计师：快速出图
• 内容创作者：配图素材
• 艺术爱好者：创作灵感
• 电商：产品图生成

🎁 拍下即发，自动发货！
🎁 电子商品，售出不退！

有需要随时问我~
"@
    }
    "combo" = @{
        Title = "AI提示词大礼包 ChatGPT+Midjourney组合 编程绘画"
        Price = "50"
        Description = @"


✨ AI提示词超级组合 ✨

📦 包含内容：
• ChatGPT完整合集（1000+模板）
• Midjourney完整合集（500+模板）
• 未来新产品免费更新
• 1对1使用指导

💰 单买要¥70，组合只要¥50！
💰 一次购买，终身受益！

🎁 拍下即发，自动发货！
🎁 电子商品，售出不退！

有需要随时问我~
"@
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

Write-Host "🌐 即将打开闲鱼..." -ForegroundColor Yellow
Write-Host ""

# 打开闲鱼
Start-Process "https://www.goofish.com/"

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
Write-Host "   - 分类：虚拟商品 > 软件" -ForegroundColor White
Write-Host "   - 价格可以稍微调低，吸引买家" -ForegroundColor White
Write-Host "   - 图片可以从website目录截取产品预览图" -ForegroundColor White
