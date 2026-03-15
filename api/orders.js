// Vercel Serverless Function - 订单API
// 使用Supabase作为真正的数据库

import { createClient } from '@supabase/supabase-js'

// Supabase配置（完全免费）
const supabaseUrl = 'https://dcnrrxezmegbkmajbxhl.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_TjJVZkPPCg3QQmiS99neeg_L4wLsQy2'
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { action } = req.query

  try {
    // 创建订单
    if (req.method === 'POST' && action === 'create') {
      const { product, email, paymentMethod, price, paymentScreenshot, notes } = req.body

      const orderId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5)

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          id: orderId,
          product,
          email,
          payment_method: paymentMethod,
          price,
          payment_screenshot: paymentScreenshot,
          notes,
          status: 'pending',
          created_at: new Date().toISOString()
        }])
        .select()

      if (error) throw error

      return res.json({ success: true, order: data[0] })
    }

    // 获取订单列表
    if (req.method === 'GET' && action === 'list') {
      const { status, limit = 100, offset = 0 } = req.query

      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error } = await query

      if (error) throw error

      return res.json({ success: true, orders: data })
    }

    // 更新订单状态
    if (req.method === 'PUT' && action === 'update') {
      const { orderId, status } = req.body

      const updateData = {
        status,
        [`${status}_at`]: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)
        .select()

      if (error) throw error

      // 如果批准订单，发送邮件（可选）
      if (status === 'approved' && data[0]) {
        // TODO: 集成邮件服务
        // await sendEmail(data[0].email, data[0].product)
      }

      return res.json({ success: true, order: data[0] })
    }

    // 获取统计数据
    if (req.method === 'GET' && action === 'stats') {
      const { count: total } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      const { count: pending } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      const { count: approved } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved')

      const { count: rejected } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'rejected')

      // 计算总收入
      const { data: approvedOrders } = await supabase
        .from('orders')
        .select('price')
        .eq('status', 'approved')

      const totalRevenue = approvedOrders?.reduce((sum, o) => sum + parseFloat(o.price), 0) || 0

      return res.json({
        success: true,
        stats: {
          total,
          pending,
          approved,
          rejected,
          totalRevenue
        }
      })
    }

    return res.status(400).json({ success: false, error: 'Invalid action' })

  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
}