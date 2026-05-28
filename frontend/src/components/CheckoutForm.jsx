import React, { useState } from 'react';

const CheckoutForm = ({ onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    address: '',
    paymentMethod: 'UPI'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.customerName.trim()) {
      tempErrors.customerName = 'Customer Name is required';
    }
    
    if (!formData.mobileNumber.trim()) {
      tempErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      tempErrors.mobileNumber = 'Mobile Number must be exactly 10 digits';
    }

    if (!formData.address.trim()) {
      tempErrors.address = 'Delivery Address is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="checkout-form-container">
      <h3>Delivery & Payment Details</h3>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter your full name"
            disabled={isLoading}
          />
          {errors.customerName && <span className="error-text">{errors.customerName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number (10 digits)</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile number"
            maxLength="10"
            disabled={isLoading}
          />
          {errors.mobileNumber && <span className="error-text">{errors.mobileNumber}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your complete delivery address"
            rows="3"
            disabled={isLoading}
          />
          {errors.address && <span className="error-text">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Back to Cart
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
