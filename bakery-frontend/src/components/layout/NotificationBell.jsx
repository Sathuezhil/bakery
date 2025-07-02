import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export default function NotificationBell({ branch = 'all', customer }) {
  const { notifications, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  // Debug logs
  console.log('NotificationBell: customer:', customer, 'branch:', branch, 'notifications:', notifications);
  // Filter notifications by customer or branch
  let filteredNotifications = notifications;
  if (customer) {
    filteredNotifications = notifications.filter(n => n.customer === customer);
  } else if (branch !== 'all' && branch) {
    filteredNotifications = notifications.filter(n => n.branch === branch);
  }
  console.log('NotificationBell: filteredNotifications:', filteredNotifications);
  const unreadCount = filteredNotifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        className="relative focus:outline-none"
        onClick={() => {
          setOpen(!open);
          if (!open) markAllAsRead();
        }}
      >
        <Bell className="w-7 h-7 text-orange-500" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b font-semibold text-bakery-brown">Notifications</div>
          <ul className="max-h-80 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <li className="p-4 text-center text-gray-500">No notifications</li>
            ) : (
              filteredNotifications.map(n => (
                <li key={n.id} className={`p-3 border-b last:border-b-0 ${n.read ? 'bg-white' : 'bg-orange-50'}`}>
                  <div className="font-medium">{n.title}</div>
                  <div className="text-sm text-gray-600">{n.description}</div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
} 