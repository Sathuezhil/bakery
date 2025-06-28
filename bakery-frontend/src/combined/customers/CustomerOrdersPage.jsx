const mockOrders = [
  { id: 1, date: '2024-06-01', items: 3, total: 1400, status: 'Delivered' },
  { id: 2, date: '2024-05-28', items: 1, total: 60, status: 'Pending' },
];

export default function CustomerOrdersPage() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Your Orders</h3>
      <ul className="space-y-4">
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
