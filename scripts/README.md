# 🚀 自动化部署脚本

本目录包含自动化脚本，用于部署和维护虚拟资源商店。

## 脚本列表

### 1. start-local-server.ps1
启动本地HTTP服务器，用于预览网站。

### 2. package-products.ps1
打包所有产品资源为zip文件，准备交付。

### 3. deploy-to-vercel.ps1
自动部署到Vercel（需要GitHub账号）。

### 4. taobao-auto-list.ps1
自动上架到淘宝（需要登录账号）。

### 5. xianyu-auto-list.ps1
自动上架到闲鱼（需要登录账号）。

---

## 使用方法

### 本地预览
```powershell
.\start-local-server.ps1
```

### 打包产品
```powershell
.\package-products.ps1
```

### 部署到Vercel
```powershell
.\deploy-to-vercel.ps1
```

---

## 注意事项

- 部分脚本需要提前登录账号
- 建议先本地预览确认无误
- 自动化脚本会持续优化

---

**让一切自动化！** 🤖
