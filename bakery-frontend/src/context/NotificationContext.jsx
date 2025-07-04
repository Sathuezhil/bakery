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
        console.log('Fetched notifications for branch', branch, data); // <-- Add this line
        setNotifications(data.reverse());
      });
  }, [branch]);

  const addNotification = (notification) => {
    setNotifications(prev => {
      const newNotif = { ...notification, id: notification.id || (Date.now() + Math.random()), read: false };
      const updated = [newNotif, ...prev.filter(n => n.id !== newNotif.id)];
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
      const updated = prev.filter(n => n.id !== id);
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