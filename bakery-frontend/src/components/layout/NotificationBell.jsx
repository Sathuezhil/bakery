import React, { useState } from 'react';
import { Bell, AlertTriangle, Package } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import ProductNotificationPopup from './ProductNotificationPopup';

export default function NotificationBell({ branch = 'all', customer }) {
  const { notifications, addNotification, markAllAsRead, removeNotification } = useNotifications();
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  // Debug logs
  console.log('NotificationBell: customer:', customer, 'branch:', branch, 'notifications:', notifications);
  // Filter notifications by customer or branch
  let filteredNotifications = notifications;
  if (customer) {
    filteredNotifications = notifications.filter(n => n.customer === customer && (n.title === 'Order Confirmed' || n.message));
  } else if (branch) {
    // Only show notifications where fromBranch is NOT the current branch
    filteredNotifications = notifications.filter(n => n.fromBranch !== branch && (n.message || n.title === 'Low Stock' || n.title === 'New Order'));
  }
  
  // Remove duplicates based on unique combination of productId, fromBranch, and branch
  const uniqueNotifications = filteredNotifications.filter((notification, index, self) => 
    index === self.findIndex(n => 
      n.productId === notification.productId && 
      n.fromBranch === notification.fromBranch && 
      n.branch === notification.branch
    )
  );
  
  console.log('NotificationBell: filteredNotifications:', uniqueNotifications);
  const unreadCount = uniqueNotifications.filter(n => !n.read).length;

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
            {uniqueNotifications.length === 0 ? (
              <li className="p-4 text-center text-gray-500">{emptyMessage}</li>
            ) : (
              uniqueNotifications.map(n => (
                isCustomerBell ? (
                  <li key={n.id || n._id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex flex-col">
                      <span className="font-semibold text-orange-900 text-base">{n.title || 'Notification'}</span>
                      <span className="text-gray-700 text-sm">{n.message || n.description}</span>
                    </div>
                  </li>
                ) : (
                  <li key={n.id || n._id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100 cursor-pointer" onClick={() => setSelectedNotification(n)}>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        {n.title === 'Low Stock' ? <Package className="w-6 h-6 text-orange-400" /> : <Bell className="w-6 h-6 text-orange-400" />}
                        <span className="font-semibold text-orange-900 text-base">
                          {n.type === 'product_added' && n.productName && n.fromBranch ? `New product "${n.productName}" added from ${n.fromBranch.charAt(0).toUpperCase() + n.fromBranch.slice(1)}` : (n.item || n.title || n.message || 'Notification')}
                        </span>
                      </div>
                      {/* Product details */}
                      {n.type === 'product_added' && n.productName && (
                        <div className="ml-9 text-sm text-gray-700">Product: <span className="font-bold text-orange-700">{n.productName}</span></div>
                      )}
                      {branch === 'combined' && n.branch && n.branch !== 'combined' && (
                        <div className="flex items-center gap-2 ml-9">
                          <span className="text-xs text-gray-600">To:</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            n.branch === 'jaffna' ? 'bg-orange-100 text-orange-700' : 
                            n.branch === 'colombo' ? 'bg-blue-100 text-blue-700' : 
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {n.branch.charAt(0).toUpperCase() + n.branch.slice(1)} Branch
                          </span>
                        </div>
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
      
      {/* Product Notification Popup */}
      {selectedNotification && (
        <ProductNotificationPopup 
          notification={selectedNotification} 
          onClose={async () => {
            // Mark as read in backend
            const id = selectedNotification._id;
            await fetch(`http://localhost:5000/api/products/notifications/${id}/read`, { method: 'PATCH' });
            removeNotification(id);
            setSelectedNotification(null);
          }} 
        />
      )}
    </div>
  );
} 