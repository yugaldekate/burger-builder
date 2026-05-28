import React from 'react';

const QuantitySelector = ({ quantity, onChange, min = 1, max = 10 }) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="quantity-selector">
      <button 
        type="button" 
        className="qty-btn" 
        onClick={handleDecrement}
        disabled={quantity <= min}
      >
        -
      </button>
      <span className="qty-value">{quantity}</span>
      <button 
        type="button" 
        className="qty-btn" 
        onClick={handleIncrement}
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
