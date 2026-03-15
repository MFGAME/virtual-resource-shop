# 🚀 正式部署指南（完全自动化）

## 第一步：创建免费数据库（Supabase）

### 1. 注册Supabase（5分钟）
访问：https://supabase.com/
- 使用GitHub账号登录（最简单）
- 创建新项目
- 记录下两个值：
  - `Project URL`
  - `anon public key`

### 2. 创建订单表
在Supabase Dashboard → SQL Editor → 粘贴：

```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  product TEXT NOT NULL,
  email TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  price DECIMAL NOT NULL,
  payment_screenshot TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  approved_at TIMESTAMP,
  rejected_at TIMESTAMP,
  reject_reason TEXT
);

-- 启用实时功能
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- 创建索引
CREATE INDEX idx_status ON orders(status);
CREATE INDEX idx_created_at ON orders(created_at DESC);
```

---

## 第二步：部署到Vercel（免费）

### 方法1：一键部署（推荐）
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

### 方法2：GitHub自动部署
1. 推送代码到GitHub
2. 访问 https://vercel.com/new
3. Import项目
4. 自动部署

---

## 第三步：配置环境变量

在Vercel Dashboard → Settings → Environment Variables：

```
SUPABASE_URL=你的项目URL
SUPABASE_ANON_KEY=你的anon_key
```

---

## 第四步：自定义域名（可选）

Vercel提供免费域名：
- `xxx.vercel.app`

或绑定自己的域名

---

## ✅ 完成！

**你的系统地址：**
- 前端：`https://xxx.vercel.app`
- API：`https://xxx.vercel.app/api/orders`

---

## 📊 成本
- Supabase：免费（500MB数据库）
- Vercel：免费（100GB带宽/月）
- **总计：0元**

---

## 🔧 自动化脚本

我可以帮你自动完成所有步骤！告诉我：
1. 是否有GitHub账号
2. 是否有Vercel账号

我立即帮你部署！