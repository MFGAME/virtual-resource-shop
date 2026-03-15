// 订单管理系统 - 本地存储版本
// 订单存储在浏览器localStorage，支持导出CSV

const ORDERS_KEY = 'virtual_resource_shop_orders';

// 创建订单
async function createOrder(orderData) {
    try {
        const orderId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

        const order = {
            id: orderId,
            product: orderData.product,
            email: orderData.email,
            payment_method: orderData.paymentMethod,
            price: orderData.price,
            payment_screenshot: orderData.paymentScreenshot,
            notes: orderData.notes,
            status: 'pending',
            created_at: new Date().toISOString()
        };

        // 保存到localStorage
        let orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
        orders.push(order);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

        return { success: true, order: order };
    } catch (error) {
        console.error('创建订单失败:', error);
        return { success: false, error: error.message };
    }
}

// 获取订单列表
async function getOrders(status = null) {
    try {
        let orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');

        if (status) {
            orders = orders.filter(o => o.status === status);
        }

        return { success: true, orders: orders };
    } catch (error) {
        console.error('获取订单失败:', error);
        return { success: false, error: error.message };
    }
}

// 更新订单状态
async function updateOrderStatus(orderId, status) {
    try {
        let orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
        const index = orders.findIndex(o => o.id === orderId);

        if (index === -1) {
            return { success: false, error: '订单不存在' };
        }

        orders[index].status = status;
        orders[index][`${status}_at`] = new Date().toISOString();
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

        return { success: true, order: orders[index] };
    } catch (error) {
        console.error('更新订单失败:', error);
        return { success: false, error: error.message };
    }
}

// 获取统计数据
async function getStats() {
    try {
        const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');

        const stats = {
            total: orders.length,
            pending: orders.filter(o => o.status === 'pending').length,
            approved: orders.filter(o => o.status === 'approved').length,
            rejected: orders.filter(o => o.status === 'rejected').length,
            totalRevenue: orders
                .filter(o => o.status === 'approved')
                .reduce((sum, o) => sum + parseFloat(o.price), 0)
        };

        return { success: true, stats: stats };
    } catch (error) {
        console.error('获取统计失败:', error);
        return { success: false, error: error.message };
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createOrder, getOrders, updateOrderStatus, getStats };
}