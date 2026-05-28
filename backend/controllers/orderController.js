const Order = require('../models/Order');
const { calculateBurgerPrice } = require('../utils/priceCalculator');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res, next) => {
  try {
    const { customerName, mobileNumber, address, paymentMethod, cartItems } = req.body;

    if (!customerName || !mobileNumber || !address || !paymentMethod || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Recalculate and validate totals backend-side to avoid frontend tampering
    let totalAmount = 0;
    const validatedCartItems = cartItems.map(item => {
      const { slices, quantity } = item;
      const pricing = calculateBurgerPrice(slices, quantity);
      
      totalAmount += pricing.finalPrice;

      return {
        slices,
        quantity,
        burgerPrice: pricing.burgerPrice,
        discounts: pricing.discounts,
        extraCharges: pricing.extraCharges,
        finalPrice: pricing.finalPrice
      };
    });

    const order = await Order.create({
      customerName,
      mobileNumber,
      address,
      paymentMethod,
      cartItems: validatedCartItems,
      totalAmount
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders
};
