import React, { useState, useEffect } from 'react';
import BurgerVisualization from './BurgerVisualization';
import SliceControls from './SliceControls';
import QuantitySelector from './QuantitySelector';
import { calculateBurgerPrice } from '../utils/pricing';

const BurgerBuilder = ({ onAddToCart }) => {
  const [slices, setSlices] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [pricing, setPricing] = useState({
    burgerPrice: 0,
    discounts: 0,
    extraCharges: 0,
    platformFee: 5,
    finalPrice: 5
  });

  // Calculate pricing when slices or quantity changes
  useEffect(() => {
    const computedPricing = calculateBurgerPrice(slices, quantity);
    setPricing(computedPricing);
  }, [slices, quantity]);

  const handleAddSlice = (sliceName) => {
    if (slices.length >= 10) return;
    setSlices(prev => [...prev, sliceName]);
  };

  const handleRemoveSlice = (index) => {
    setSlices(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    setSlices(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index) => {
    if (index === slices.length - 1) return;
    setSlices(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  const handleAddToCart = () => {
    onAddToCart({
      slices,
      quantity,
      burgerPrice: pricing.burgerPrice,
      discounts: pricing.discounts,
      extraCharges: pricing.extraCharges,
      finalPrice: pricing.finalPrice
    });
    // Reset builder
    setSlices([]);
    setQuantity(1);
  };

  const maxSlicesReached = slices.length >= 10;
  const showChefWarning = slices.length > 6;

  return (
    <div className="burger-builder-container">
      <div className="builder-header">
        <h2>Build Your Custom Burger</h2>
        <p>Choose your ingredients. Breads are automatically added at top and bottom!</p>
      </div>

      <div className="builder-layout">
        {/* Left Side - Visual stack */}
        <div className="builder-visualization-panel">
          <BurgerVisualization slices={slices} />
        </div>

        {/* Right Side - Ingredient selectors & pricing */}
        <div className="builder-controls-panel">
          <SliceControls
            slices={slices}
            onAdd={handleAddSlice}
            onRemove={handleRemoveSlice}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            maxSlicesReached={maxSlicesReached}
          />

          {showChefWarning && (
            <div className="warning-banner">
              ⚠️ Chef suggests splitting this burger into two burgers! (More than 6 slices)
            </div>
          )}

          <div className="builder-pricing-box">
            <h3>Customization Pricing</h3>
            <div className="price-item">
              <span>Burger Base Slices Price:</span>
              <span>₹{pricing.burgerPrice}</span>
            </div>
            {pricing.discounts > 0 && (
              <div className="price-item discount">
                <span>Cheese + Paneer Discount:</span>
                <span>-₹{pricing.discounts}</span>
              </div>
            )}
            {pricing.extraCharges > 0 && (
              <div className="price-item extra-charge">
                <span>Consecutive Aloo Tikki Charge:</span>
                <span>+₹{pricing.extraCharges}</span>
              </div>
            )}
            <div className="price-item">
              <span>Platform Fee:</span>
              <span>+₹{pricing.platformFee}</span>
            </div>
            <div className="price-item quantity-row">
              <span>Burger Quantity:</span>
              <QuantitySelector quantity={quantity} onChange={setQuantity} min={1} max={10} />
            </div>
            <hr />
            <div className="price-item final-total">
              <span>Single Burger Total:</span>
              <span>₹{(pricing.finalPrice / quantity).toFixed(0)}</span>
            </div>
            <div className="price-item final-total font-large">
              <span>Selected Amount:</span>
              <span>₹{pricing.finalPrice}</span>
            </div>

            <button
              type="button"
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerBuilder;
