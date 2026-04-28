import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  excerpt: String,
  body: { type: String, required: true },
  author: { type: String, default: 'Chef Marshall' },
  category: { type: String, default: 'Stories' },
  cover: String,
  tags: [String],
}, { timestamps: true });

export default mongoose.model('BlogPost', blogPostSchema);
