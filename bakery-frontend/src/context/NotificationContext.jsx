import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children, branch }) {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from backend for the current branch
  useEffect(() => {
    if (!branch) return;
    fetch(`http://localhost:5000/api/products/notifications?branch=${branch}`)
      .then(res => res.json())
      .then(data => {
        // Only keep unread notifications
        const unread = data.filter(n => !n.read);
        setNotifications(unread.reverse());
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