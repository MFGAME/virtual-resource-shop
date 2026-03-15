// API配置
const API_BASE_URL = 'https://virtual-resource-shop.vercel.app/api/orders';

// 创建订单
async function createOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}?action=create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('创建订单失败:', error);
        return { success: false, error: error.message };
    }
}

// 获取订单列表
async function getOrders(status = null) {
    try {
        let url = `${API_BASE_URL}?action=list`;
        if (status) {
            url += `&status=${status}`;
        }

        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('获取订单失败:', error);
        return { success: false, error: error.message };
    }
}

// 更新订单状态
async function updateOrderStatus(orderId, status) {
    try {
        const response = await fetch(`${API_BASE_URL}?action=update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId, status })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('更新订单失败:', error);
        return { success: false, error: error.message };
    }
}

// 获取统计数据
async function getStats() {
    try {
        const response = await fetch(`${API_BASE_URL}?action=stats`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('获取统计失败:', error);
        return { success: false, error: error.message };
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createOrder, getOrders, updateOrderStatus, getStats };
}