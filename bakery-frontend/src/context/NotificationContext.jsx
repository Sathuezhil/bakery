import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

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