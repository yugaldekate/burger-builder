import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const placeOrder = async (orderData) => {
  const response = await API.post('/orders', orderData);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await API.get('/orders');
  return response.data;
};
