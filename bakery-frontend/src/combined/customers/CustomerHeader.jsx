import { useState } from 'react';
import { Bell, Package, AlertTriangle } from 'lucide-react';
import NotificationBell from '../../components/layout/NotificationBell';

const sampleNotifications = [
  { id: 1, type: 'order', message: 'Your order #1234 has been delivered!', time: '2 min ago' },
  { id: 2, type: 'system', message: 'Bakery system updated!', time: '10 min ago' },
  { id: 3, type: 'order', message: 'Order #1235 is being prepared.', time: '1 hour ago' },
];

export default function CustomerHeader({ customer }) {
  console.log('Customer bell for:', customer?.username || customer?.id);
  console.log('Customer object:', customer);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState(sampleNotifications);
  const unreadCount = notifications.length;

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-orange-200/50 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="text-xl font-bold text-orange-700">Bakery</div>
        <NotificationBell branch={null} customer={customer?.username || customer?.id} />
      </div>
    </header>
  );
} 