const SLICE_PRICES = {
  'Aloo Tikki': 20,
  'Paneer': 25,
  'Cheese': 15,
  'Tomato': 10,
  'Onion': 10,
  'Lettuce': 8
};

const PLATFORM_FEE = 5;

/**
 * Calculates the price, discounts, and extra charges for a single burger configuration
 * @param {string[]} slices - Array of slice names
 * @param {number} quantity - Quantity of this burger
 * @returns {object} pricing details
 */
const calculateBurgerPrice = (slices, quantity = 1) => {
  let sumOfSlices = 0;
  
  slices.forEach(slice => {
    sumOfSlices += SLICE_PRICES[slice] || 0;
  });

  const basePrice = sumOfSlices * quantity;

  // Rule 1: Cheese + Paneer together -> discount of 3
  const hasCheese = slices.includes('Cheese');
  const hasPaneer = slices.includes('Paneer');
  const discounts = (hasCheese && hasPaneer) ? 3 : 0;

  // Rule 2: Two consecutive Aloo Tikki slices -> extra charge of 2
  let hasConsecutiveAlooTikki = false;
  for (let i = 0; i < slices.length - 1; i++) {
    if (slices[i] === 'Aloo Tikki' && slices[i + 1] === 'Aloo Tikki') {
      hasConsecutiveAlooTikki = true;
      break;
    }
  }
  const extraCharges = hasConsecutiveAlooTikki ? 2 : 0;

  // Final Price formula: (Sum of slices * quantity) - discount + extra charges + platform fee
  const burgerPrice = basePrice;
  const finalPrice = basePrice - discounts + extraCharges + PLATFORM_FEE;

  return {
    burgerPrice,
    discounts,
    extraCharges,
    platformFee: PLATFORM_FEE,
    finalPrice: Math.max(0, finalPrice)
  };
};

module.exports = {
  calculateBurgerPrice,
  SLICE_PRICES,
  PLATFORM_FEE
};
