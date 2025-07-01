import { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('orders');
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
} 