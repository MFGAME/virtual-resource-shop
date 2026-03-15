// Vercel Serverless Function - 订单管理API
// 使用文件系统存储订单（简单的JSON文件）

const fs = require('fs');
const path = require('path');

const ORDERS_FILE = path.join('/tmp', 'orders.json');

// 初始化订单文件
function initOrdersFile() {
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
  }
}

// 读取所有订单
function readOrders() {
  initOrdersFile();
  const data = fs.readFileSync(ORDERS_FILE, 'utf8');
  return JSON.parse(data);
}

// 保存订单
function saveOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

module.exports = async (req, res) => {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method } = req;
  const { action } = req.query;

  try {
    // 创建订单
    if (method === 'POST' && action === 'create') {
      const { product, email, paymentMethod, price } = req.body;
      
      const order = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        product,
        email,
        paymentMethod,
        price,
        status: 'pending', // pending, paid, completed
        createdAt: new Date().toISOString(),
        paidAt: null,
        completedAt: null
      };

      const orders = readOrders();
      orders.push(order);
      saveOrders(orders);

      res.json({ success: true, order });
      return;
    }

    // 获取所有订单
    if (method === 'GET' && action === 'list') {
      const orders = readOrders();
      res.json({ success: true, orders });
      return;
    }

    // 更新订单状态
    if (method === 'PUT' && action === 'update') {
      const { orderId, status } = req.body;
      
      const orders = readOrders();
      const index = orders.findIndex(o => o.id === orderId);
      
      if (index === -1) {
        res.status(404).json({ success: false, error: '订单不存在' });
        return;
      }

      orders[index].status = status;
      orders[index][`${status}At`] = new Date().toISOString();
      saveOrders(orders);

      res.json({ success: true, order: orders[index] });
      return;
    }

    // 获取统计数据
    if (method === 'GET' && action === 'stats') {
      const orders = readOrders();
      const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        paid: orders.filter(o => o.status === 'paid').length,
        completed: orders.filter(o => o.status === 'completed').length,
        totalRevenue: orders
          .filter(o => o.status === 'completed')
          .reduce((sum, o) => sum + parseFloat(o.price), 0)
      };
      res.json({ success: true, stats });
      return;
    }

    res.status(400).json({ success: false, error: '无效的操作' });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};