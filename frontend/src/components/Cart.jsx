import React from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const Cart = ({ cartItems = [], onUpdateQuantity, onRemove, onProceed, isCheckoutPage = false }) => {
  return (
    <div className="cart-container">
      <h2>Your Cart ({cartItems.length} items)</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty.</p>
          <p>Build a delicious custom burger and click "Add to Cart" to see it here!</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                index={index}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </div>
          
          <CartSummary
            cartItems={cartItems}
            onProceed={onProceed}
            isCheckoutPage={isCheckoutPage}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
