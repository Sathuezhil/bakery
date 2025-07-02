const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion');

// GET /api/promotions
router.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/promotions
router.post('/', async (req, res) => {
  try {
    const { title, description, code, expires } = req.body;
    if (!title || !description || !code || !expires) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const promo = new Promotion({ title, description, code, expires });
    await promo.save();
    res.status(201).json(promo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 