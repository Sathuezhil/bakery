const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  expires: { type: Date, required: true },
});

module.exports = mongoose.model('Promotion', PromotionSchema); 