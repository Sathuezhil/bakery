const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a new product to both branches
router.post('/', async (req, res) => {
  try {
    const { branch, ...productData } = req.body;
    if (!branch) {
      return res.status(400).json({ error: 'Branch is required' });
    }
    // Save product for the requested branch
    const product = new Product({ ...productData, branch });
    await product.save();

    // Save product for the other branch as well
    const otherBranch = branch === 'Colombo' ? 'Jaffna' : 'Colombo';
    const productForOtherBranch = new Product({ ...productData, branch: otherBranch });
    await productForOtherBranch.save();

    res.json({
      added: [product, productForOtherBranch]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 