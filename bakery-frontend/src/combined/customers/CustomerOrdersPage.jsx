import { useCart } from "@/context/CartContext";

const mockOrders = [
  { id: 1, date: '2024-06-01', items: 3, total: 1400, status: 'Delivered' },
  { id: 2, date: '2024-05-28', items: 1, total: 60, status: 'Pending' },
];

export default function CustomerOrdersPage() {
  const { cart } = useCart();
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Your Orders</h3>
      <ul className="space-y-4">
        {/* Show cart as a pending order if cart is not empty */}
        {cart.length > 0 && (
          <li className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
            <div className="font-semibold text-orange-600">Pending Order (Cart)</div>
            <div>Items: {cartItemsCount}</div>
            <div>Total: Rs.{cartTotal}</div>
            <div>Status: <span className="font-semibold">Pending</span></div>
            <ul className="mt-2 text-sm text-gray-700">
              {cart.map(item => (
                <li key={item._id || item.id}>
                  {item.name} x {item.quantity} (Rs.{item.price} each)
                </li>
              ))}
            </ul>
          </li>
        )}
        {/* Show previous orders */}
        {mockOrders.map((order) => (
          <li key={order.id} className="p-4 bg-orange-50 rounded-lg">
            <div>Date: {order.date}</div>
            <div>Items: {order.items}</div>
            <div>Total: Rs.{order.total}</div>
            <div>Status: <span className="font-semibold">{order.status}</span></div>
          </li>
        ))}
      </ul>
    </div>
  );
} 
