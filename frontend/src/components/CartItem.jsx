import React from 'react';
import QuantitySelector from './QuantitySelector';
import { SLICES } from '../data/slices';

const CartItem = ({ item, index, onUpdateQuantity, onRemove }) => {
  const { slices, quantity, burgerPrice, discounts, extraCharges, finalPrice } = item;

  const getSliceColor = (name) => {
    const found = SLICES.find(s => s.name === name);
    return found ? found.color : '#cccccc';
  };

  return (
    <div className="cart-item-card">
      <div className="cart-item-header">
        <h4>Custom Burger #{index + 1}</h4>
        <button 
          type="button" 
          className="item-remove-btn"
          onClick={() => onRemove(index)}
        >
          Remove
        </button>
      </div>

      <div className="cart-item-body">
        {/* Mini Burger Stack listing */}
        <div className="mini-burger-preview">
          <div className="mini-layer mini-bread">Bread</div>
          {slices.map((slice, i) => (
            <div 
              key={i} 
              className="mini-layer" 
              style={{ backgroundColor: getSliceColor(slice) }}
            >
              {slice}
            </div>
          ))}
          <div className="mini-layer mini-bread">Bread</div>
        </div>

        <div className="cart-item-details">
          <div className="slice-listing">
            <strong>Slices:</strong> {slices.length === 0 ? 'Plain bread only' : slices.join(', ')}
          </div>
          
          <div className="cart-qty-row">
            <span><strong>Quantity:</strong></span>
            <QuantitySelector 
              quantity={quantity} 
              onChange={(newQty) => onUpdateQuantity(index, newQty)} 
              min={1} 
              max={10}
            />
          </div>

          <div className="item-price-breakdown">
            <div>Base Price: ₹{burgerPrice}</div>
            {discounts > 0 && <div className="discount-text">Discount: -₹{discounts}</div>}
            {extraCharges > 0 && <div className="extra-text">Extra Charge: +₹{extraCharges}</div>}
            <div>Platform Fee: +₹5</div>
            <div className="item-final-price"><strong>Final Price: ₹{finalPrice}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
