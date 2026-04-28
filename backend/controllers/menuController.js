import asyncHandler from 'express-async-handler';
import MenuItem from '../models/MenuItem.js';

export const getMenu = asyncHandler(async (req, res) => {
  const items = await MenuItem.find({ available: true }).sort({ category: 1, name: 1 });
  res.json(items);
});

export const getMenuByCategory = asyncHandler(async (req, res) => {
  const items = await MenuItem.find({ category: req.params.category, available: true });
  res.json(items);
});

export const createMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
});

export const updateMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) { res.status(404); throw new Error('Menu item not found'); }
  res.json(item);
});

export const deleteMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) { res.status(404); throw new Error('Menu item not found'); }
  res.json({ message: 'Deleted' });
});
