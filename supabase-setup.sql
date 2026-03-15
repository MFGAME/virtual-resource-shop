-- Supabase 数据库表创建脚本
-- 请在 Supabase Dashboard → SQL Editor 中执行此脚本

-- 1. 创建订单表
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  product TEXT NOT NULL,
  email TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  price DECIMAL NOT NULL,
  payment_screenshot TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  reject_reason TEXT
);

-- 2. 启用实时功能（可选，用于实时更新）
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- 3. 创建索引（提升查询性能）
CREATE INDEX idx_status ON orders(status);
CREATE INDEX idx_created_at ON orders(created_at DESC);

-- 4. 设置行级安全策略（RLS）
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 允许所有人插入订单（创建订单）
CREATE POLICY "允许创建订单" ON orders
  FOR INSERT
  WITH CHECK (true);

-- 允许所有人查看订单（根据需要可以限制）
CREATE POLICY "允许查看订单" ON orders
  FOR SELECT
  USING (true);

-- 允许所有人更新订单状态
CREATE POLICY "允许更新订单" ON orders
  FOR UPDATE
  USING (true);

-- 5. 插入测试数据（可选）
INSERT INTO orders (id, product, email, payment_method, price, status, created_at)
VALUES
  ('test001', 'ChatGPT Prompt合集', 'test@example.com', 'wechat', 29.9, 'pending', NOW()),
  ('test002', 'Midjourney Prompt合集', 'demo@example.com', 'alipay', 39.9, 'approved', NOW());

-- ✅ 完成！
-- 现在可以在 Table Editor 中查看 orders 表