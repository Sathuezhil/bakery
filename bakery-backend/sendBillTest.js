const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// ======= EDIT THESE VALUES =======
const orderId = 'YOUR_ORDER_ID'; // Example: 662e1b2c3a4f5d6e7f8a9b0c
const email = 'YOUR_EMAIL@gmail.com'; // Your email to receive the bill
const pdfPath = 'C:/Users/sathu/OneDrive/Desktop/Sweet Dreams Bakery - Admin Dashboard.pdf'; // Full path to a sample PDF file
const apiUrl = 'http://localhost:5000/api/bill/send'; // Change port if needed
// =================================

const form = new FormData();
form.append('orderId', orderId);
form.append('email', email);
form.append('pdf', fs.createReadStream(pdfPath));
axios.post(apiUrl, form, {
  headers: form.getHeaders()
}).then(res => {
  console.log('✅ Success:', res.data);
}).catch(err => {
  if (err.response) {
    console.error('❌ Error:', err.response.data);
  } else {
    console.error('❌ Error:', err.message);
  }
}); 
