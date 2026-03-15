# GitHub Pages 部署指南

## 🚀 自动部署到GitHub Pages

### 第一步：获取GitHub信息

**需要提供：**
1. **GitHub用户名**（你的邮箱是510019437@qq.com，但需要用户名）
2. **Personal Access Token**（用于推送代码）

### 第二步：创建Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选权限：
   - ✅ repo（完整仓库权限）
4. 点击 "Generate token"
5. **立即复制Token**（只显示一次！）

### 第三步：告诉我Token

把Token发给我，我会：
- 自动创建GitHub仓库
- 推送所有代码
- 启用GitHub Pages
- 给你最终网址

---

## 📦 或者：手动部署步骤

如果你想自己操作：

```powershell
# 1. 在GitHub网站创建仓库：virtual-resource-shop
# 2. 运行以下命令：

cd virtual-resource-shop
git remote add origin https://github.com/你的用户名/virtual-resource-shop.git
git branch -M main
git push -u origin main

# 3. 在仓库Settings -> Pages -> 选择main分支 -> Save
# 4. 等待1-2分钟，访问：https://你的用户名.github.io/virtual-resource-shop
```

---

## 💡 部署后效果

- **网站地址**：`https://你的用户名.github.io/virtual-resource-shop/website/`
- **24小时在线**
- **免费HTTPS**
- **全球CDN加速**

---

## 🎯 当前状态

✅ Git仓库已初始化
✅ 代码已提交
⏳ 等待GitHub用户名和Token
