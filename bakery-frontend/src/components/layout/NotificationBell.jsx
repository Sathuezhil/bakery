import React, { useState } from 'react';
import { Bell, AlertTriangle, Package } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export default function NotificationBell({ branch = 'all', customer }) {
  const { notifications, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  // Debug logs
  console.log('NotificationBell: customer:', customer, 'branch:', branch, 'notifications:', notifications);
  // Filter notifications by customer or branch
  let filteredNotifications = notifications;
  if (customer) {
    filteredNotifications = notifications.filter(n => n.customer === customer && (n.title === 'Order Confirmed' || n.message));
  } else if (branch === 'combined' || branch === 'all' || !branch) {
    // Show all notifications with a message or legacy title
    filteredNotifications = notifications.filter(n => n.message || n.title === 'Low Stock' || n.title === 'New Order');
  } else if (branch) {
    // Show only this branch's notifications with a message or legacy title
    filteredNotifications = notifications.filter(n => n.branch === branch && (n.message || n.title === 'Low Stock' || n.title === 'New Order'));
  }
  console.log('NotificationBell: filteredNotifications:', filteredNotifications);
  const unreadCount = filteredNotifications.filter(n => !n.read).length;

  // Determine dropdown title and empty message
  const isCustomerBell = !!customer;
  const dropdownTitle = isCustomerBell ? 'Order Notifications' : 'Notifications';
  const emptyMessage = isCustomerBell ? 'No order notifications' : 'No notifications';

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
        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b font-semibold text-bakery-brown flex items-center gap-2">
            {isCustomerBell ? <Bell className="w-5 h-5 text-orange-500" /> : <AlertTriangle className="w-5 h-5 text-red-500" />}
            {dropdownTitle}
          </div>
          <ul className="max-h-80 overflow-y-auto p-4 space-y-3">
            {filteredNotifications.length === 0 ? (
              <li className="p-4 text-center text-gray-500">{emptyMessage}</li>
            ) : (
              filteredNotifications.map(n => (
                isCustomerBell ? (
                  <li key={n.id || n._id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex flex-col">
                      <span className="font-semibold text-orange-900 text-base">{n.title || 'Notification'}</span>
                      <span className="text-gray-700 text-sm">{n.message || n.description}</span>
                    </div>
                  </li>
                ) : (
                  <li key={n.id || n._id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100 cursor-pointer" onClick={() => n.type === 'product_added' ? setSelectedNotification(n) : null}>
                    <div className="flex items-center gap-3">
                      {n.title === 'Low Stock' ? <Package className="w-6 h-6 text-orange-400" /> : <Bell className="w-6 h-6 text-orange-400" />}
                      <span className="font-semibold text-orange-900 text-base">{n.item || n.title || n.message || 'Notification'}</span>
                      {branch === 'combined' && n.branch && (
                        <span className={`ml-2 text-xs font-bold ${n.branch === 'jaffna' ? 'text-orange-600' : n.branch === 'colombo' ? 'text-blue-600' : 'text-gray-600'}`}>{n.branch.charAt(0).toUpperCase() + n.branch.slice(1)} Branch</span>
                      )}
                      {n.title === 'New Order' && n.orderBranch && branch === 'combined' && (
                        <span className={`ml-2 text-xs font-bold ${n.orderBranch === 'jaffna' ? 'text-orange-600' : n.orderBranch === 'colombo' ? 'text-blue-600' : 'text-gray-600'}`}>({n.orderBranch.charAt(0).toUpperCase() + n.orderBranch.slice(1)})</span>
                      )}
                    </div>
                    {n.stock && (
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">Stock: {n.stock}</span>
                    )}
                    {n.title === 'New Order' && (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">{n.message}</span>
                    )}
                  </li>
                )
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
} 