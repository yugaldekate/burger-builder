import React from 'react';

const CartSummary = ({ cartItems = [], onProceed, isCheckoutPage = false }) => {
  const summary = cartItems.reduce((acc, item) => {
    acc.subtotal += item.burgerPrice;
    acc.discounts += item.discounts;
    acc.extraCharges += item.extraCharges;
    acc.platformFees += 5; // Fixed 5 per burger type added
    acc.total += item.finalPrice;
    return acc;
  }, { subtotal: 0, discounts: 0, extraCharges: 0, platformFees: 0, total: 0 });

  if (cartItems.length === 0) return null;

  return (
    <div className="cart-summary-card">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Base Burger Total</span>
        <span>₹{summary.subtotal}</span>
      </div>
      {summary.discounts > 0 && (
        <div className="summary-row discount">
          <span>Applied Discounts (-)</span>
          <span>₹{summary.discounts}</span>
        </div>
      )}
      {summary.extraCharges > 0 && (
        <div className="summary-row extra-charge">
          <span>Extra Charges (+)</span>
          <span>₹{summary.extraCharges}</span>
        </div>
      )}
      <div className="summary-row">
        <span>Platform Fee (+)</span>
        <span>₹{summary.platformFees}</span>
      </div>
      <hr />
      <div className="summary-row grand-total">
        <span>Grand Total</span>
        <span>₹{summary.total}</span>
      </div>

      {!isCheckoutPage && (
        <button
          type="button"
          className="proceed-btn"
          onClick={onProceed}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartSummary;
