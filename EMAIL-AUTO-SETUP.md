# 自动邮件发货系统设置指南

## 📧 使用EmailJS免费服务

### 优势
- ✅ 完全免费（每月200封邮件）
- ✅ 不需要后端服务器
- ✅ 支持Gmail/QQ邮箱等
- ✅ 5分钟配置完成

---

## 🚀 配置步骤

### Step 1：注册EmailJS
1. 访问：https://www.emailjs.com/
2. 注册免费账号
3. 验证邮箱

### Step 2：添加邮件服务
1. 登录后进入 Dashboard
2. 点击 "Email Services" → "Add New Service"
3. 选择你的邮箱提供商（Gmail/QQ邮箱等）
4. 授权连接
5. 记下 **Service ID**（如：service_xxxxxxx）

### Step 3：创建邮件模板
1. 点击 "Email Templates" → "Create New Template"
2. 模板内容：

```
主题：您的{{product_name}}下载链接

正文：
亲爱的客户，

感谢购买我们的AI资源！

📦 商品：{{product_name}}
💰 金额：¥{{price}}

📥 下载链接：
{{download_link}}

📖 使用方法：
1. 点击上方链接下载文件
2. 解压ZIP文件
3. 用Markdown编辑器或Notion打开

如有问题请回复此邮件。

祝使用愉快！
AI资源商店团队
```

3. 保存后记下 **Template ID**（如：template_xxxxxxx）

### Step 4：获取API密钥
1. 点击 "Account" → "API Keys"
2. 复制 **Public Key**（如：user_xxxxxxxxxxxxxxxx）

---

## 🔧 集成到网站

### 方法1：我帮你自动集成（推荐）

把你的EmailJS信息告诉我：
- Service ID: ___________
- Template ID: ___________
- Public Key: ___________

我会自动修改代码并部署！

### 方法2：手动集成

#### 1. 在网站添加EmailJS库

在 `payment.html` 的 `<head>` 里添加：
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

#### 2. 修改表单提交逻辑

在 `payment.html` 的 `<script>` 部分修改：

```javascript
// 初始化EmailJS
emailjs.init('你的_PUBLIC_KEY');

// 表单提交
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const product = document.getElementById('productSelect').value;
    const email = document.getElementById('email').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    // 产品信息
    const products = {
        'chatgpt': { name: 'ChatGPT Prompt合集', price: '29.9', link: 'https://mfgame.github.io/virtual-resource-shop/download.html#chatgpt' },
        'midjourney': { name: 'Midjourney Prompt合集', price: '39.9', link: 'https://mfgame.github.io/virtual-resource-shop/download.html#midjourney' },
        'combo': { name: '超级组合套餐', price: '59.9', link: 'https://mfgame.github.io/virtual-resource-shop/download.html' }
    };

    const productInfo = products[product];

    // 发送邮件
    await emailjs.send('你的_SERVICE_ID', '你的_TEMPLATE_ID', {
        to_email: email,
        product_name: productInfo.name,
        price: productInfo.price,
        download_link: productInfo.link
    });

    // 显示成功消息
    document.getElementById('orderForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
});
```

---

## ✅ 完成后效果

**用户购买流程：**
```
1. 访问网站 → 选择商品
2. 点击购买 → 跳转到支付页
3. 扫码支付 → 填写邮箱
4. 提交表单 → 自动收到邮件
5. 点击邮件里的链接下载
```

**老大完全不用操作！** 💰

---

## 📊 费用
- EmailJS免费版：200封/月
- 超过后：$5/月或1000封
- **对于刚开始完全够用！**

---

## 🎯 备选方案

### 如果EmailJS不满足需求：

1. **Formspree**（免费1000次/月）
   - 更简单，但功能较少
   - https://formspree.io/

2. **Google Apps Script**（完全免费）
   - 无限制
   - 需要Google账号
   - 配置稍复杂

3. **自建服务器**
   - 用Vercel/Netlify Functions
   - 完全免费
   - 需要更多配置

---

## 💡 我的建议

**现在就做：**
1. 花5分钟注册EmailJS
2. 把Service ID、Template ID、Public Key告诉我
3. 我立即集成并部署

**完成时间：10分钟**

之后你就有了一个完全自动化的销售系统！🚀