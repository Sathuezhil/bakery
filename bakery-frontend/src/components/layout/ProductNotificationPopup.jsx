import React from 'react';

export default function ProductNotificationPopup({ notification, onClose }) {
  if (!notification) return null;
  
  const formatBranchName = (branch) => {
    return branch.charAt(0).toUpperCase() + branch.slice(1);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-orange-700">New Product Added</h2>
        <div className="space-y-3">
          <div>
            <span className="font-semibold text-gray-700">Product Name:</span>
            <p className="text-lg font-bold text-orange-600">{notification.productName}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Added From:</span>
            <p className="text-lg font-bold text-blue-600">{formatBranchName(notification.fromBranch)} Branch</p>
          </div>
          {notification.message && (
            <div>
              <span className="font-semibold text-gray-700">Message:</span>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
          )}
          <div>
            <span className="font-semibold text-gray-700">Date:</span>
            <p className="text-sm text-gray-600">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors" 
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 