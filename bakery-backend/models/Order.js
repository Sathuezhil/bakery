const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: Number, required: true },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  total: { type: Number, required: true },
  customerEmail: { type: String },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema); 