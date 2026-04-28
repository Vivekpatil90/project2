import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import MenuItem from '../models/MenuItem.js';
import BlogPost from '../models/BlogPost.js';
import User from '../models/User.js';

dotenv.config();
await connectDB();

const menu = [
  { name: 'Roasted Beet Carpaccio', description: 'Heirloom beets, whipped goat cheese, candied walnut', price: 12, category: 'Starters', isVeg: true },
  { name: 'Charred Padrón Peppers', description: 'Sea salt, lemon, smoked aioli', price: 9, category: 'Starters', isVeg: true },
  { name: 'Tuna Tartare', description: 'Avocado, yuzu, sesame crisp', price: 16, category: 'Starters', isVeg: false },
  { name: 'Wild Mushroom Risotto', description: 'Arborio, parmesan, truffle oil, thyme', price: 22, category: 'Main Course', isVeg: true },
  { name: 'Herb-Crusted Lamb Rack', description: 'Rosemary jus, root vegetables, polenta', price: 34, category: 'Main Course', isVeg: false },
  { name: 'Pan-Seared Sea Bass', description: 'Saffron broth, fennel, citrus', price: 29, category: 'Main Course', isVeg: false },
  { name: 'Garden Pappardelle', description: 'Spring vegetables, lemon-basil butter', price: 21, category: 'Main Course', isVeg: true },
  { name: 'Dark Chocolate Tart', description: '70% cacao, smoked salt, raspberry', price: 11, category: 'Desserts', isVeg: true },
  { name: 'Lemon Olive Oil Cake', description: 'Mascarpone, candied lemon zest', price: 10, category: 'Desserts', isVeg: true },
  { name: 'Sage Old Fashioned', description: 'Bourbon, sage syrup, orange bitters', price: 14, category: 'Beverages', isVeg: true },
  { name: 'Cucumber Mint Cooler', description: 'Fresh-pressed, sparkling, lime', price: 7, category: 'Beverages', isVeg: true },
  { name: 'Single-Origin Espresso', description: 'Ethiopian Yirgacheffe', price: 4, category: 'Beverages', isVeg: true },
];

const posts = [
  { title: 'Why we cook with the seasons', slug: 'cook-with-seasons', excerpt: 'Our farm-to-table philosophy in three acts.', body: 'At Verdant, every dish begins with what is harvested this week. Seasonality is not a trend — it is a respect for the land...', category: 'Philosophy', tags: ['farm-to-table'] },
  { title: "Chef's Spring Special: Margretta Pizza with Extra Cheese", slug: 'chefs-spring-morel', excerpt: 'A 12-hour stock and foraged morels.', body: 'Spring brings the elusive morel mushroom. We forage from the foothills and pair them with a slow-simmered chicken stock...', category: "Chef's Special", tags: ['spring', 'risotto'] },
  { title: 'Pairing wine with vegetable-forward dishes', slug: 'wine-veg-pairing', excerpt: 'Light reds, mineral whites, and the joy of contrast.', body: 'Pairing wine with vegetables is an art of texture and earth. Try a Beaujolais with roasted roots...', category: 'Pairing', tags: ['wine'] },
];

await MenuItem.deleteMany();
await BlogPost.deleteMany();
await MenuItem.insertMany(menu);
await BlogPost.insertMany(posts);

// Seed admin user (idempotent)
const adminEmail = (process.env.ADMIN_EMAIL || 'admin@verdant.local').toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
const adminName = process.env.ADMIN_NAME || 'Verdant Admin';

const existing = await User.findOne({ email: adminEmail });
if (existing) {
  existing.name = adminName;
  existing.password = adminPassword; // re-hash via pre-save
  existing.role = 'admin';
  await existing.save();
  console.log(`♻️  Admin updated: ${adminEmail}`);
} else {
  await User.create({ name: adminName, email: adminEmail, password: adminPassword, role: 'admin' });
  console.log(`👤 Admin created: ${adminEmail} / ${adminPassword}`);
}

console.log(`✅ Seeded ${menu.length} menu items and ${posts.length} posts`);
await mongoose.connection.close();
