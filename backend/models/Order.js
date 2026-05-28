const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  slices: {
    type: [String],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  burgerPrice: {
    type: Number,
    required: true
  },
  discounts: {
    type: Number,
    required: true,
    default: 0
  },
  extraCharges: {
    type: Number,
    required: true,
    default: 0
  },
  finalPrice: {
    type: Number,
    required: true
  }
});

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Please add a customer name'],
    trim: true
  },
  mobileNumber: {
    type: String,
    required: [true, 'Please add a mobile number'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
    trim: true
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please select a payment method'],
    enum: ['UPI', 'Cash', 'COD', 'Net Banking']
  },
  cartItems: {
    type: [CartItemSchema],
    required: true,
    validate: [val => val.length > 0, 'Cart must have at least one burger']
  },
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
