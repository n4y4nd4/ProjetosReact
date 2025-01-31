//screens/OrdersContext
import React, { createContext, useState } from 'react';
import * as Notifications from 'expo-notifications';

export const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const addOrder = async (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);


    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Pedido Realizado! 🍽️',
        body: `Seu pedido será entregue em breve! Endereço: ${order.address}`,
        data: { order },
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}
