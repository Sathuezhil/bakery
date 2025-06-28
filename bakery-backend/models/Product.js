const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  branch: String,
  stock: Number,
});
module.exports = mongoose.model('Product', ProductSchema); 