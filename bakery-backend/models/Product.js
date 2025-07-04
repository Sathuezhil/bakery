const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number,
  description: String,
  image: String,
  branches: [String], // Array of branches (e.g., ['Jaffna', 'Colombo'])
  status: String,
  rating: Number,
  sales: Number
});

module.exports = mongoose.model('Product', ProductSchema); 