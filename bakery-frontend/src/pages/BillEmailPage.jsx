import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

export default function BillEmailPage() {
  const { orderId } = useParams();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [order, setOrder] = useState(null);
  console.log('orderId:', orderId);
  useEffect(() => {
    fetch(`/api/bill/order/${orderId}`)
      .then(res => res.json())
      .then(data => setOrder(data.order))
      .catch(() => setOrder(null));
  }, [orderId]);

  useEffect(() => {
    // Add global style for .no-pdf
    const style = document.createElement('style');
    style.innerHTML = `
      body.pdf-mode .no-pdf { display: none !important; }
      @media print { .no-pdf { display: none !important; } }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleDownloadBill = () => {
    const billElement = document.getElementById('bill-content');
    if (!billElement) return;
    document.body.classList.add('pdf-mode');
    html2pdf().set({
      margin: 0,
      filename: 'bill.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all'] }
    }).from(billElement).save().then(() => {
      document.body.classList.remove('pdf-mode');
    }).catch(() => {
      document.body.classList.remove('pdf-mode');
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const billElement = document.getElementById('bill-content');
      if (!billElement) {
        setStatus('error');
        setMessage('Bill not found.');
        return;
      }
      const pdfBlob = await html2pdf().set({
        margin: 0,
        filename: 'bill.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all'] }
      }).from(billElement).outputPdf('blob');
      const formData = new FormData();
      formData.append('orderId', orderId);
      formData.append('email', email);
      formData.append('pdf', pdfBlob, 'bill.pdf');
      // Use relative path; Vite proxy will forward to backend
      const res = await fetch('/api/bill/send', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setStatus('success');
        setMessage('Bill sent to your email!');
      } else {
        const data = await res.json();
        setStatus('error');
        setMessage(data.error || 'Failed to send bill.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to send bill.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border-2 border-green-400">
        <h2 className="text-2xl font-bold text-orange-700 mb-4 text-center">Get Your Bill by Email</h2>
        {order ? (
          <div id="bill-content" style={{
            width: '420px',
            margin: '0 auto',
            background: '#fff',
            padding: '32px 32px 0 32px',
            borderRadius: '16px',
            fontFamily: 'Arial, sans-serif',
            color: '#222',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            marginBottom: 0
          }}>
            {/* Only bill content below will be in the PDF. Do NOT put download/email buttons inside this div. */}
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#c2410c', letterSpacing: 1, marginBottom: 4 }}>SE Bakery</div>
              <div style={{ fontSize: 15, color: '#444' }}>123 Main Street, Colombo, Sri Lanka</div>
              <div style={{ fontSize: 15, color: '#444', marginBottom: 4 }}>Phone: +94 77 123 4567</div>
              <div style={{ width: 60, height: 4, background: 'linear-gradient(90deg,#fb923c,#fbbf24)', borderRadius: 4, margin: '0 auto 10px auto' }}></div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#15803d', marginBottom: 8, textAlign: 'center' }}>Payment Successful!</div>
            <div style={{ marginBottom: 12, textAlign: 'center', fontSize: 16 }}>Thank you for your order. Here is your bill:</div>
            <table style={{ width: '100%', fontSize: 15, color: '#222', borderCollapse: 'collapse', marginBottom: 18 }}>
              <thead>
                <tr style={{ background: '#d1fae5' }}>
                  <th style={{ padding: '10px 6px', textAlign: 'left', fontWeight: 700 }}>Product</th>
                  <th style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 700 }}>Qty</th>
                  <th style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 700 }}>Price</th>
                  <th style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 700 }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.name}>
                    <td style={{ padding: '10px 6px', borderBottom: '1px solid #e5e7eb' }}>{item.name}</td>
                    <td style={{ padding: '10px 6px', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>{item.quantity}</td>
                    <td style={{ padding: '10px 6px', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Rs.{item.price}</td>
                    <td style={{ padding: '10px 6px', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Rs.{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '18px 0 8px 0' }}>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#15803d' }}>Total Paid:</span>
              <span style={{ fontWeight: 800, fontSize: 20, color: '#166534' }}>Rs.{order.total}</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mb-4">Loading bill...</div>
        )}
        {/* Download Bill button is OUTSIDE bill-content, so it will NOT appear in the PDF. */}
        {order && (
          <button
            type="button"
            className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition-colors text-lg mt-4 no-pdf"
            onClick={handleDownloadBill}
          >
            Download Bill
          </button>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <input
            type="email"
            className="border rounded px-3 py-2 text-lg"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white rounded py-2 font-semibold hover:bg-green-700 transition-colors text-lg"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Bill'}
          </button>
        </form>
        {status === 'success' && <div className="mt-4 text-green-700 font-semibold text-center">{message}</div>}
        {status === 'error' && <div className="mt-4 text-red-600 font-semibold text-center">{message}</div>}
      </div>
    </div>
  );
} 