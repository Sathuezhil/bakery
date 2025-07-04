const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  branch: String, // Branch to notify
  message: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  fromBranch: String, // Originating branch
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema); 