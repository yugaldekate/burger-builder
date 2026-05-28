import { SLICE_PRICES } from '../data/slices';

export const PLATFORM_FEE = 5;

/**
 * Calculates pricing for a burger configuration
 * @param {string[]} slices - Custom slice names
 * @param {number} quantity - Quantity of the burger
 * @returns {object} pricing details
 */
export const calculateBurgerPrice = (slices = [], quantity = 1) => {
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
