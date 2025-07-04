import React from 'react';

export default function ProductNotificationPopup({ notification, onClose }) {
  if (!notification) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-2">New Product Added</h2>
        <p><b>Name:</b> {notification.productName}</p>
        <p><b>Category:</b> {notification.category}</p>
        <p><b>Price:</b> {notification.price}</p>
        <p><b>Added from:</b> {notification.fromBranch}</p>
        <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
} 