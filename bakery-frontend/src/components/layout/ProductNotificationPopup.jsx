import React from 'react';
import ReactDOM from 'react-dom';

export default function ProductNotificationPopup({ notification, onClose }) {
  if (!notification) return null;
  
  const formatBranchName = (branch) => {
    return branch.charAt(0).toUpperCase() + branch.slice(1);
  };
  
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-80 z-[999999]">
      <div className="mt-40 bg-white rounded-lg shadow-2xl border-2 border-orange-200 p-6 w-96" style={{ zIndex: 1000000 }}>
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
    </div>,
    document.body
  );
} 