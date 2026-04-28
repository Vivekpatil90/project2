import asyncHandler from 'express-async-handler';
import BlogPost from '../models/BlogPost.js';

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find().sort({ createdAt: -1 });
  res.json(posts);
});

export const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug });
  if (!post) { res.status(404); throw new Error('Post not found'); }
  res.json(post);
});

export const createPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.create(req.body);
  res.status(201).json(post);
});
