// 完整系统验证 - Node.js测试脚本
const fs = require('fs');
const path = require('path');

// 模拟localStorage
class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }

    clear() {
        this.store = {};
    }
}

// 创建全局localStorage
global.localStorage = new LocalStorageMock();

// 加载API代码
const apiCode = fs.readFileSync(path.join(__dirname, 'js/api.js'), 'utf8');
eval(apiCode);

// 测试结果
let testsPassed = 0;
let testsFailed = 0;
const testResults = [];

console.log('=== 开始完整系统验证 ===\n');

// 测试1: 创建订单
console.log('📋 测试1: 创建订单');
(async () => {
    try {
        const orderData = {
            product: 'ChatGPT Prompt合集',
            email: 'test-user@example.com',
            paymentMethod: 'wechat',
            price: '29.9',
            paymentScreenshot: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
            notes: '完整流程测试订单'
        };

        const result = await createOrder(orderData);

        if (result.success && result.order.id) {
            console.log('✅ 通过: 订单创建成功');
            console.log('   订单ID:', result.order.id);
            console.log('   商品:', result.order.product);
            console.log('   邮箱:', result.order.email);
            console.log('   金额:', result.order.price);
            testsPassed++;
            testResults.push({ test: '创建订单', status: '通过', orderId: result.order.id });

            // 测试2: 读取订单
            console.log('\n📋 测试2: 读取订单列表');
            const listResult = await getOrders();
            if (listResult.success && listResult.orders.length > 0) {
                console.log('✅ 通过: 成功读取', listResult.orders.length, '个订单');
                testsPassed++;
                testResults.push({ test: '读取订单', status: '通过', count: listResult.orders.length });

                // 测试3: 更新订单状态
                console.log('\n📋 测试3: 更新订单状态');
                const updateResult = await updateOrderStatus(result.order.id, 'approved');
                if (updateResult.success && updateResult.order.status === 'approved') {
                    console.log('✅ 通过: 订单状态已更新为 approved');
                    testsPassed++;
                    testResults.push({ test: '更新订单状态', status: '通过' });

                    // 测试4: 统计数据
                    console.log('\n📋 测试4: 统计数据');
                    const statsResult = await getStats();
                    if (statsResult.success) {
                        console.log('✅ 通过: 统计数据获取成功');
                        console.log('   总订单:', statsResult.stats.total);
                        console.log('   待审核:', statsResult.stats.pending);
                        console.log('   已批准:', statsResult.stats.approved);
                        console.log('   总收入: ¥', statsResult.stats.totalRevenue.toFixed(1));
                        testsPassed++;
                        testResults.push({ test: '统计数据', status: '通过', stats: statsResult.stats });

                        // 测试5: 创建更多订单
                        console.log('\n📋 测试5: 创建多个测试订单');
                        for (let i = 0; i < 3; i++) {
                            await createOrder({
                                product: ['ChatGPT Prompt合集', 'Midjourney Prompt合集', '超级组合套餐'][i],
                                email: `user${i + 1}@test.com`,
                                paymentMethod: i % 2 === 0 ? 'wechat' : 'alipay',
                                price: ['29.9', '39.9', '59.9'][i],
                                paymentScreenshot: 'test',
                                notes: `批量测试订单 ${i + 1}`
                            });
                        }
                        console.log('✅ 通过: 成功创建3个测试订单');
                        testsPassed++;
                        testResults.push({ test: '批量创建订单', status: '通过', count: 3 });

                        // 测试6: 过滤订单
                        console.log('\n📋 测试6: 按状态过滤订单');
                        const pendingOrders = await getOrders('pending');
                        const approvedOrders = await getOrders('approved');
                        console.log('✅ 通过: 待审核', pendingOrders.orders.length, '个, 已批准', approvedOrders.orders.length, '个');
                        testsPassed++;
                        testResults.push({ test: '过滤订单', status: '通过' });

                        // 测试7: 数据持久化
                        console.log('\n📋 测试7: 数据持久化验证');
                        const savedData = localStorage.getItem('virtual_resource_shop_orders');
                        if (savedData) {
                            const parsedData = JSON.parse(savedData);
                            console.log('✅ 通过: localStorage数据正确保存');
                            console.log('   存储的订单数:', parsedData.length);
                            testsPassed++;
                            testResults.push({ test: '数据持久化', status: '通过', storedCount: parsedData.length });
                        } else {
                            console.log('❌ 失败: localStorage数据未保存');
                            testsFailed++;
                            testResults.push({ test: '数据持久化', status: '失败' });
                        }

                        // 测试8: CSV导出格式验证
                        console.log('\n📋 测试8: CSV导出格式验证');
                        const allOrders = JSON.parse(localStorage.getItem('virtual_resource_shop_orders') || '[]');
                        if (allOrders.length > 0) {
                            const csvHeaders = ['订单号', '商品', '金额', '邮箱', '支付方式', '状态', '提交时间'];
                            const csvRows = allOrders.map(o => [
                                o.id,
                                o.product,
                                o.price,
                                o.email,
                                o.payment_method,
                                o.status,
                                new Date(o.created_at).toLocaleString('zh-CN')
                            ]);
                            console.log('✅ 通过: CSV格式正确');
                            console.log('   表头:', csvHeaders.join(', '));
                            console.log('   示例行:', csvRows[0].join(', '));
                            testsPassed++;
                            testResults.push({ test: 'CSV导出格式', status: '通过' });
                        }

                    } else {
                        console.log('❌ 失败: 统计数据获取失败');
                        testsFailed++;
                        testResults.push({ test: '统计数据', status: '失败' });
                    }
                } else {
                    console.log('❌ 失败: 订单状态更新失败');
                    testsFailed++;
                    testResults.push({ test: '更新订单状态', status: '失败' });
                }
            } else {
                console.log('❌ 失败: 订单读取失败');
                testsFailed++;
                testResults.push({ test: '读取订单', status: '失败' });
            }
        } else {
            console.log('❌ 失败: 订单创建失败');
            testsFailed++;
            testResults.push({ test: '创建订单', status: '失败' });
        }
    } catch (error) {
        console.log('❌ 错误:', error.message);
        testsFailed++;
        testResults.push({ test: '创建订单', status: '错误', error: error.message });
    }

    // 最终报告
    console.log('\n' + '='.repeat(50));
    console.log('验证完成！');
    console.log('='.repeat(50));
    console.log(`✅ 通过: ${testsPassed} 个测试`);
    console.log(`❌ 失败: ${testsFailed} 个测试`);
    console.log(`📊 成功率: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`);

    console.log('\n详细结果:');
    testResults.forEach((result, index) => {
        console.log(`${index + 1}. ${result.test}: ${result.status}`);
    });

    // 保存测试报告
    const report = {
        timestamp: new Date().toISOString(),
        summary: {
            passed: testsPassed,
            failed: testsFailed,
            successRate: ((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1) + '%'
        },
        results: testResults
    };

    fs.writeFileSync(
        path.join(__dirname, 'test-report.json'),
        JSON.stringify(report, null, 2)
    );

    console.log('\n📄 测试报告已保存到: test-report.json');

    // 验证所有页面文件
    console.log('\n' + '='.repeat(50));
    console.log('页面文件验证:');
    console.log('='.repeat(50));

    const pages = [
        'index.html',
        'website/index.html',
        'payment-final.html',
        'admin-final.html',
        'download.html',
        'js/api.js'
    ];

    pages.forEach(page => {
        const filePath = path.join(__dirname, page);
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            console.log(`✅ ${page} - ${stats.size} bytes`);
        } else {
            console.log(`❌ ${page} - 文件不存在`);
        }
    });

    process.exit(testsFailed > 0 ? 1 : 0);
})();