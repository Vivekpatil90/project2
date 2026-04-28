import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

export const createOrder = asyncHandler(async (req, res) => {
  const subtotal = (req.body.items || []).reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal; // taxes/delivery could be added
  const order = await Order.create({ ...req.body, subtotal, total });
  res.status(201).json(order);
});

export const getOrders = asyncHandler(async (req, res) => {
  const list = await Order.find().sort({ createdAt: -1 });
  res.json(list);
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error('Order not found'); }
  res.json(order);
});
