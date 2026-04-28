import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';

export const createContact = asyncHandler(async (req, res) => {
  const c = await Contact.create(req.body);
  res.status(201).json({ message: 'Thanks! We will respond shortly.', id: c._id });
});

export const getContacts = asyncHandler(async (req, res) => {
  const list = await Contact.find().sort({ createdAt: -1 });
  res.json(list);
});
