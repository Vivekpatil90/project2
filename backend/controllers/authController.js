import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const sanitize = (u) => ({
  _id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
});

// POST /api/auth/signup
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email and password are required');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    res.status(409);
    throw new Error('Email already registered');
  }
  const user = await User.create({ name, email, password, role: 'user' });
  res.status(201).json({ user: sanitize(user), token: signToken(user._id) });
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  res.json({ user: sanitize(user), token: signToken(user._id) });
});

// GET /api/auth/me
export const me = asyncHandler(async (req, res) => {
  res.json({ user: sanitize(req.user) });
});
