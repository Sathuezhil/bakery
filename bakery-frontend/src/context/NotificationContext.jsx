import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children, branch }) {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from backend for the current branch
  useEffect(() => {
    if (!branch) {
      // For customer notifications, initialize with empty array
      // TODO: Implement customer-specific notification fetching
      setNotifications([]);
      return;
    }
    
    console.log('Fetching notifications for branch:', branch);
    fetch(`http://localhost:5000/api/products/notifications?branch=${branch}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched notifications:', data);
        // Only keep unread notifications
        const unread = data.filter(n => !n.read);
        setNotifications(unread.reverse());
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      });
  }, [branch]);

  const addNotification = (notification) => {
    setNotifications(prev => {
      // Always use _id from backend
      const newNotif = { ...notification, read: false };
      const updated = [newNotif, ...prev.filter(n => n._id !== newNotif._id)];
      console.log('addNotification:', newNotif);
      console.log('notifications after add:', updated);
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n._id !== id);
      console.log('removeNotification:', id);
      console.log('notifications after remove:', updated);
      return updated;
    });
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAllAsRead, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
} 