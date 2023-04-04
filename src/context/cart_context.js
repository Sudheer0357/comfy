import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions';

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 5034,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, amount, color, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, amount, color, product } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  });

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
