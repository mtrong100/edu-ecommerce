import React, { createContext, useEffect, useState } from "react";
import { getCart, setCart } from "../utils/localStorageUtils";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getCart());

  const addItem = (item) => {
    const exists = cartItems.find((p) => p.id === item.id);
    if (!exists) {
      const updated = [...cartItems, item];
      setCartItems(updated);
      setCart(updated);
    }
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    setCart(updated);
  };

  useEffect(() => {
    setCart(getCart());
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
