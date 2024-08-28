import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.length;

  return (
    <Link to="/cart">
      <div>
        <span>Cart</span>
        <span>{itemCount}</span>
      </div>
    </Link>
  );
};

export default CartIcon;