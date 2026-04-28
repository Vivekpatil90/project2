import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
  name: String,
  price: Number,
  qty: Number,
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    address: { type: String, required: true },
  },
  items: [orderItemSchema],
  subtotal: Number,
  total: Number,
  paymentMethod: { type: String, enum: ['cash', 'card', 'upi'], default: 'cash' },
  status: { type: String, enum: ['placed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'], default: 'placed' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
