const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer();
const Order = require('../models/Order');
console.log('bill.js loaded!');

router.post('/send', upload.single('pdf'), async (req, res) => {
  console.log('POST /api/bill/send called');
  const { orderId, email } = req.body;
  if (!orderId || !email || !req.file) {
    console.log('Missing data:', { orderId, email, file: !!req.file });
    return res.status(400).json({ error: 'Missing orderId, email, or PDF file' });
  }

  // Configure nodemailer (replace with your real credentials)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ezhilarasiva15@gmail.com', // replace with your email
      pass: 'hblr umyw omaf ykeg' // replace with your app password
    }
  });

  try {
    await transporter.sendMail({
      from: 'ezhilarasiva15@gmail.com',
      to: email,
      subject: 'Your Bakery Bill',
      text: 'Attached is your bill from SE Bakery.',
      attachments: [{ filename: 'bill.pdf', content: req.file.buffer }]
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

// Create a test order (for testing purposes)
router.post('/create-test-order', async (req, res) => {
  try {
    const order = await Order.create({
      orderNumber: Math.floor(Math.random() * 10000000000000),
      items: [
        { name: 'Bread', quantity: 2, price: 200 },
        { name: 'Cake', quantity: 1, price: 500 }
      ],
      total: 900,
      customerEmail: 'test@example.com',
      status: 'Pending'
    });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create test order', details: err.message });
  }
});
router.get('/test', (req, res) => {
  res.json({ ok: true });
});

router.get('/test-connection', (req, res) => {
  console.log('✅ Backend: /api/bill/test-connection called');
  res.json({ success: true, message: 'Backend connected!' });
});

module.exports = router;