const express = require('express');
const Product = require('../models/Product');
const Notification = require('../models/Notification');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a new product (with branches array logic and notifications)
router.post('/', async (req, res) => {
  try {
    const { name, category, branches = [], ...productData } = req.body;
    const addedBranches = Array.isArray(branches) ? branches : [branches];
    const fromBranch = addedBranches[0]; // The branch that initiated the add
    let product = await Product.findOne({ name, category });
    if (product) {
      // Add new branches if not present
      let newBranches = addedBranches.filter(b => !product.branches.includes(b));
      if (newBranches.length > 0) {
        product.branches.push(...newBranches);
        await product.save();
        // Create notifications for new branches (except the one that added)
        for (let branch of newBranches) {
          if (branch !== fromBranch) {
            await Notification.create({
              productId: product._id,
              productName: product.name,
              fromBranch,
              toBranch: branch,
              type: 'product_added',
              createdAt: new Date()
            });
          }
        }
      }
      res.status(201).json({ product, added: [product] });
    } else {
      // Create new product with all branches
      product = await Product.create({ name, category, ...productData, branches: addedBranches });
      // Create notifications for all branches except the one that added
      for (let i = 1; i < addedBranches.length; i++) {
        await Notification.create({
          productId: product._id,
          productName: product.name,
          fromBranch,
          toBranch: addedBranches[i],
          type: 'product_added',
          createdAt: new Date()
        });
      }
      res.status(201).json({ product, added: [product] });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/notifications?branch=Colombo
router.get('/notifications', async (req, res) => {
  try {
    const { branch } = req.query;
    const notifications = await Notification.find({ branch }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/notifications/:id/read
router.patch('/notifications/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 