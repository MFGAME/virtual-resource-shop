// 简单的订单管理系统
// 使用 GitHub Gist 作为免费数据库

const GIST_ID = 'your-gist-id-here'; // 待替换
const GIST_TOKEN = 'your-gist-token-here'; // 待替换

// 产品配置
const products = {
    'chatgpt': {
        name: 'ChatGPT Prompt合集',
        price: '29.9',
        downloadUrl: 'https://mfgame.github.io/virtual-resource-shop/download.html#chatgpt'
    },
    'midjourney': {
        name: 'Midjourney Prompt合集',
        price: '39.9',
        downloadUrl: 'https://mfgame.github.io/virtual-resource-shop/download.html#midjourney'
    },
    'combo': {
        name: '超级组合套餐',
        price: '59.9',
        downloadUrl: 'https://mfgame.github.io/virtual-resource-shop/download.html'
    }
};

// 创建订单
async function createOrder(productKey, email, paymentScreenshot) {
    const order = {
        id: Date.now().toString(36),
        product: products[productKey],
        email,
        paymentScreenshot, // 支付截图的base64
        status: 'pending', // pending, approved, rejected
        createdAt: new Date().toISOString()
    };
    
    // 这里暂时存localStorage，实际部署时存到Gist或数据库
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    return order;
}

// 获取所有订单
function getOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

// 更新订单状态
function updateOrderStatus(orderId, status) {
    let orders = getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
        orders[index].status = status;
        orders[index][`${status}At`] = new Date().toISOString();
        localStorage.setItem('orders', JSON.stringify(orders));
        return orders[index];
    }
    return null;
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createOrder, getOrders, updateOrderStatus, products };
}