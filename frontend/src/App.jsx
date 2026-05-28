import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import { calculateBurgerPrice } from './utils/pricing';
import { fetchOrders } from './services/api';
import './styles/app.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [activePage, setActivePage] = useState('build'); // 'build' or 'orders'
  const [pastOrders, setPastOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const handleAddToCart = (burgerItem) => {
    setCart(prev => [...prev, burgerItem]);
  };

  const handleUpdateQuantity = (index, newQty) => {
    setCart(prev => {
      return prev.map((item, idx) => {
        if (idx === index) {
          const pricing = calculateBurgerPrice(item.slices, newQty);
          return {
            ...item,
            quantity: newQty,
            burgerPrice: pricing.burgerPrice,
            discounts: pricing.discounts,
            extraCharges: pricing.extraCharges,
            finalPrice: pricing.finalPrice
          };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (index) => {
    setCart(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Load past orders from DB
  const loadPastOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await fetchOrders();
      if (response.success) {
        setPastOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching past orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (activePage === 'orders') {
      loadPastOrders();
    }
  }, [activePage]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <h1>🍔 Burger<span>Builder</span></h1>
        </div>
        <nav className="header-nav">
          <button 
            type="button" 
            className={`nav-btn ${activePage === 'build' ? 'active' : ''}`}
            onClick={() => setActivePage('build')}
          >
            Burger Builder
          </button>
          <button 
            type="button" 
            className={`nav-btn ${activePage === 'orders' ? 'active' : ''}`}
            onClick={() => setActivePage('orders')}
          >
            Past Orders
          </button>
        </nav>
      </header>

      <main>
        {activePage === 'build' ? (
          <Home
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        ) : (
          <div className="orders-page-container main-content-panel">
            <h2>All Past Orders</h2>
            {loadingOrders ? (
              <p>Loading orders from database...</p>
            ) : pastOrders.length === 0 ? (
              <p>No orders found in MongoDB. Create one in the builder!</p>
            ) : (
              <div className="orders-table-wrapper">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Customer Info</th>
                      <th>Delivery Address</th>
                      <th>Burger Configurations</th>
                      <th>Payment</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastOrders.map(order => (
                      <tr key={order._id}>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>
                          <strong>{order.customerName}</strong>
                          <div style={{ fontSize: '0.8rem', color: '#718096' }}>{order.mobileNumber}</div>
                        </td>
                        <td>{order.address}</td>
                        <td>
                          {order.cartItems.map((item, idx) => (
                            <div key={idx} style={{ marginBottom: '8px' }}>
                              <strong>Custom Burger x{item.quantity}</strong>
                              <div>
                                {item.slices.length === 0 ? (
                                  <span className="receipt-slices-badge">Plain Bread Only</span>
                                ) : (
                                  item.slices.map((slice, i) => (
                                    <span key={i} className="receipt-slices-badge">{slice}</span>
                                  ))
                                )}
                              </div>
                            </div>
                          ))}
                        </td>
                        <td>
                          <span style={{ fontWeight: '500' }}>{order.paymentMethod}</span>
                        </td>
                        <td>
                          <strong style={{ color: '#e67e22' }}>₹{order.totalAmount}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
