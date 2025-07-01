import { useCart } from "@/context/CartContext";
import { useState, useRef } from 'react';
import { useOrders } from '../../context/OrdersContext';

const mockOrders = [
  { id: 1, date: '2024-06-01', items: 3, total: 1400, status: 'Delivered' },
  { id: 2, date: '2024-05-28', items: 1, total: 60, status: 'Pending' },
];

export default function CustomerOrdersPage() {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [lastPaidCart, setLastPaidCart] = useState([]);
  // Simulate saved card (in real app, get from user profile)
  const hasSavedCard = true;
  const { addOrder, orders: allOrders } = useOrders();
  const [cardType, setCardType] = useState('saved'); // 'saved' or 'new'
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvv: '' });
  const billRef = useRef();
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const lastPaidTotal = lastPaidCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Your Orders</h3>
      <ul className="space-y-4">
        {/* Show payment success and bill even if cart is empty */}
        {paymentSuccess && (
          <li className="p-4 bg-green-50 rounded border border-green-300 max-w-md mx-auto" ref={billRef}>
            <div className="text-lg font-bold text-green-700 mb-2">Payment Successful!</div>
            <div className="mb-2">Thank you for your order. Here is your bill:</div>
            <table className="min-w-full text-sm text-gray-700 border border-green-200 rounded mb-2">
              <thead>
                <tr className="bg-green-100">
                  <th className="px-2 py-1 text-left">Product</th>
                  <th className="px-2 py-1 text-right">Qty</th>
                  <th className="px-2 py-1 text-right">Price</th>
                  <th className="px-2 py-1 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {lastPaidCart.map(item => (
                  <tr key={item.id || item._id}>
                    <td className="px-2 py-1">{item.name}</td>
                    <td className="px-2 py-1 text-right">{item.quantity}</td>
                    <td className="px-2 py-1 text-right">Rs.{item.price}</td>
                    <td className="px-2 py-1 text-right">Rs.{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="font-semibold">Total Paid: Rs.{lastPaidTotal}</div>
            <div className="text-sm text-gray-700 mt-2">Paid with: {cardType === 'saved' ? 'Saved Card (**** 1234)' : 'New Card'}</div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
              onClick={() => {
                window.print();
              }}
            >
              Download Bill
            </button>
          </li>
        )}
        {/* Show cart as a pending order if cart is not empty and payment not done */}
        {cart.length > 0 && !paymentSuccess && (
          <li className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
            <div className="font-semibold text-orange-600">Pending Order (Cart)</div>
            <div>Items: {cartItemsCount}</div>
            <div>Total: Rs.{cartTotal}</div>
            <div>Status: <span className="font-semibold">Pending</span></div>
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full text-sm text-gray-700 border border-yellow-200 rounded">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="px-2 py-1 text-left">Product</th>
                    <th className="px-2 py-1 text-right">Qty</th>
                    <th className="px-2 py-1 text-right">Price</th>
                    <th className="px-2 py-1 text-right">Subtotal</th>
                    <th className="px-2 py-1 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id || item._id}>
                      <td className="px-2 py-1">{item.name}</td>
                      <td className="px-2 py-1 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
                            onClick={() => updateCartItemQuantity(item.id || item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >-</button>
                          <span>{item.quantity}</span>
                          <button
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
                            onClick={() => updateCartItemQuantity(item.id || item._id, item.quantity + 1)}
                          >+</button>
                        </div>
                      </td>
                      <td className="px-2 py-1 text-right">Rs.{item.price}</td>
                      <td className="px-2 py-1 text-right">Rs.{item.price * item.quantity}</td>
                      <td className="px-2 py-1 text-center">
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
                          onClick={() => removeFromCart(item.id || item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!showPayment && !paymentSuccess && (
              hasSavedCard ? (
                <div className="mt-4 p-4 bg-white rounded border border-yellow-200 space-y-3 max-w-md mx-auto text-center">
                  <div className="mb-2 text-green-700 font-semibold">Card ending in 1234 will be used for payment.</div>
                  <div className="flex flex-col gap-2 mb-2">
                    <label className="flex items-center gap-2 justify-center">
                      <input type="radio" name="cardType" value="saved" checked={cardType === 'saved'} onChange={() => setCardType('saved')} />
                      Use saved card
                    </label>
                    <label className="flex items-center gap-2 justify-center">
                      <input type="radio" name="cardType" value="new" checked={cardType === 'new'} onChange={() => setCardType('new')} />
                      Pay with new card
                    </label>
                  </div>
                  {cardType === 'new' && (
                    <form className="space-y-2 mb-2">
                      <input type="text" className="w-full border rounded px-2 py-1" placeholder="Card Number" maxLength={19} value={newCard.number} onChange={e => setNewCard({ ...newCard, number: e.target.value })} />
                      <div className="flex gap-2">
                        <input type="text" className="w-full border rounded px-2 py-1" placeholder="MM/YY" maxLength={5} value={newCard.expiry} onChange={e => setNewCard({ ...newCard, expiry: e.target.value })} />
                        <input type="password" className="w-full border rounded px-2 py-1" placeholder="CVV" maxLength={4} value={newCard.cvv} onChange={e => setNewCard({ ...newCard, cvv: e.target.value })} />
                      </div>
                    </form>
                  )}
                  <button
                    className="w-full bg-green-600 text-white rounded py-2 font-semibold hover:bg-green-700 transition-colors"
                    onClick={() => {
                      setLastPaidCart(cart);
                      setPaymentSuccess(true);
                      // Add order to OrdersContext
                      addOrder({
                        id: Date.now(),
                        date: new Date().toISOString().slice(0,10),
                        items: cart,
                        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
                        status: 'Pending',
                        branch: 'jaffna',
                        customer: 'Arun Kumar',
                        paymentMethod: cardType === 'saved' ? 'Saved Card' : 'New Card',
                        cardInfo: cardType === 'new' ? { ...newCard } : { number: '**** **** **** 1234' },
                      });
                      clearCart();
                    }}
                  >
                    Pay
                  </button>
                </div>
              ) : (
                <form className="mt-4 p-4 bg-white rounded border border-yellow-200 space-y-3 max-w-md mx-auto">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Card Number</label>
                    <input type="text" className="w-full border rounded px-2 py-1" placeholder="1234 5678 9012 3456" maxLength={19} />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-1">Expiry</label>
                      <input type="text" className="w-full border rounded px-2 py-1" placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-1">CVV</label>
                      <input type="password" className="w-full border rounded px-2 py-1" placeholder="123" maxLength={4} />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-green-600 text-white rounded py-2 font-semibold hover:bg-green-700 transition-colors"
                    onClick={() => {
                      setLastPaidCart(cart);
                      setPaymentSuccess(true);
                      // Add order to OrdersContext
                      addOrder({
                        id: Date.now(),
                        date: new Date().toISOString().slice(0,10),
                        items: cart,
                        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
                        status: 'Pending',
                        branch: 'jaffna', // or get from props/context
                        customer: 'Arun Kumar', // or get from user context
                      });
                      clearCart();
                    }}
                  >
                    Pay
                  </button>
                </form>
              )
            )}
          </li>
        )}
        {/* Order History Section */}
        <h4 className="text-lg font-semibold mt-8 mb-2">Order History</h4>
        <ul className="space-y-4">
          {allOrders.length === 0 && (
            <li className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">No previous orders found.</li>
          )}
          {allOrders.map((order) => (
            <li key={order.id} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Order #{order.id}</div>
                  <div className="text-xs text-gray-500">Date: {order.date || order.orderDate?.slice(0,10)}</div>
                  <div className="text-xs text-gray-500">Status: <span className="font-semibold">{order.status}</span></div>
                </div>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                  onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                >
                  {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>
              {/* Status Progress Bar */}
              <div className="flex items-center gap-2 mt-2 mb-2">
                {['Pending', 'Preparing', 'Ready', 'Delivered'].map((step, idx) => {
                  const statusIdx = ['Pending', 'Preparing', 'Ready', 'Delivered'].indexOf(
                    (order.status || '').charAt(0).toUpperCase() + (order.status || '').slice(1)
                  );
                  return (
                    <div key={step} className="flex items-center gap-1">
                      <div className={`w-20 h-2 rounded-full ${idx <= statusIdx ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      {idx < 3 && <span className="w-2 h-2 rounded-full bg-gray-300"></span>}
                    </div>
                  );
                })}
              </div>
              {/* Order Details */}
              {expandedOrderId === order.id && (
                <div className="mt-2 border-t pt-2">
                  <div className="font-semibold mb-1">Items:</div>
                  <ul className="mb-2 text-sm">
                    {(order.items || []).map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>Rs.{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-1">Total: <span className="font-semibold">Rs.{order.total}</span></div>
                  <div className="mb-1">Payment: <span className="font-semibold">{order.paymentMethod || 'N/A'}</span></div>
                  <div className="mb-1">Status: <span className="font-semibold">{order.status}</span></div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
} 
