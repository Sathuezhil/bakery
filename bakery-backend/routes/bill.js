const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer();

router.post('/send', upload.single('pdf'), async (req, res) => {
  const { orderId, email } = req.body;
  if (!orderId || !email || !req.file) {
    return res.status(400).json({ error: 'Missing orderId, email, or PDF file' });
  }

  // Configure nodemailer (replace with your real credentials)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourbakerydemo@gmail.com', // replace with your email
      pass: 'yourapppassword' // replace with your app password
    }
  });

  try {
    await transporter.sendMail({
      from: 'yourbakerydemo@gmail.com',
      to: email,
      subject: 'Your Bakery Bill',
      text: 'Attached is your bill from SE Bakery.',
      attachments: [{ filename: 'bill.pdf', content: req.file.buffer }]
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

module.exports = router; 