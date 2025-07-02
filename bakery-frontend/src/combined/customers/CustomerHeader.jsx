import { useState } from 'react';
import { Bell, Package, AlertTriangle } from 'lucide-react';

const sampleNotifications = [
  { id: 1, type: 'order', message: 'Your order #1234 has been delivered!', time: '2 min ago' },
  { id: 2, type: 'system', message: 'Bakery system updated!', time: '10 min ago' },
  { id: 3, type: 'order', message: 'Order #1235 is being prepared.', time: '1 hour ago' },
];

export default function CustomerHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState(sampleNotifications);
  const unreadCount = notifications.length;

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-orange-200/50 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="text-xl font-bold text-orange-700">Bakery</div>
        <div className="relative">
          <button
            className="relative focus:outline-none"
            onClick={() => setShowNotifications((v) => !v)}
            aria-label="Show notifications"
          >
            <Bell className="w-7 h-7 text-orange-500" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold border-2 border-white">{unreadCount}</span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-orange-100 z-50">
              <div className="px-4 py-3 border-b font-bold text-orange-700 flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-400" /> Notifications
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y divide-orange-50">
                {notifications.length === 0 ? (
                  <li className="p-4 text-center text-gray-400">No notifications</li>
                ) : notifications.map((n) => (
                  <li key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-orange-50 transition">
                    {n.type === 'order' ? <Package className="w-5 h-5 text-orange-400 mt-1" /> : <AlertTriangle className="w-5 h-5 text-blue-400 mt-1" />}
                    <div className="flex-1">
                      <div className="text-sm text-gray-800">{n.message}</div>
                      <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 