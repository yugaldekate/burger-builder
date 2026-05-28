import React, { useState } from 'react';
import BurgerBuilder from '../components/BurgerBuilder';
import Cart from '../components/Cart';
import CheckoutForm from '../components/CheckoutForm';
import { placeOrder } from '../services/api';

const Home = ({ cart, onAddToCart, onUpdateQuantity, onRemoveFromCart, onClearCart }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const handleProceedToCheckout = () => {
    setIsCheckout(true);
  };

  const handleCancelCheckout = () => {
    setIsCheckout(false);
  };

  const handlePlaceOrder = async (customerDetails) => {
    setIsLoading(true);
    try {
      const orderPayload = {
        customerName: customerDetails.customerName,
        mobileNumber: customerDetails.mobileNumber,
        address: customerDetails.address,
        paymentMethod: customerDetails.paymentMethod,
        cartItems: cart
      };

      const result = await placeOrder(orderPayload);
      if (result.success) {
        setOrderSuccess(result.data);
        onClearCart();
        setIsCheckout(false);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error placing order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissSuccess = () => {
    setOrderSuccess(null);
  };

  return (
    <div className="home-page-container">
      {orderSuccess && (
        <div className="modal-backdrop">
          <div className="success-modal">
            <span className="success-icon">🎉</span>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you, <strong>{orderSuccess.customerName}</strong>! Your order has been saved to MongoDB.</p>
            <div className="order-receipt-summary">
              <div><strong>Order ID:</strong> {orderSuccess._id}</div>
              <div><strong>Total Amount Paid:</strong> ₹{orderSuccess.totalAmount}</div>
              <div><strong>Payment Method:</strong> {orderSuccess.paymentMethod}</div>
            </div>
            <button 
              type="button" 
              className="modal-dismiss-btn"
              onClick={handleDismissSuccess}
            >
              Order Something Else!
            </button>
          </div>
        </div>
      )}

      <div className="app-grid-layout">
        {/* Left Side: Burger Builder OR Checkout Form */}
        <div className="main-content-panel">
          {isCheckout ? (
            <CheckoutForm 
              onSubmit={handlePlaceOrder} 
              onCancel={handleCancelCheckout}
              isLoading={isLoading}
            />
          ) : (
            <BurgerBuilder onAddToCart={onAddToCart} />
          )}
        </div>

        {/* Right Side: Cart list */}
        <div className="sidebar-panel">
          <Cart
            cartItems={cart}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveFromCart}
            onProceed={handleProceedToCheckout}
            isCheckoutPage={isCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
