export const SLICES = [
  { name: 'Aloo Tikki', price: 20, color: '#8B4513', textColor: '#ffffff' },
  { name: 'Paneer', price: 25, color: '#FF8C00', textColor: '#ffffff' },
  { name: 'Cheese', price: 15, color: '#FFD700', textColor: '#333333' },
  { name: 'Tomato', price: 10, color: '#FF6347', textColor: '#ffffff' },
  { name: 'Onion', price: 10, color: '#BA55D3', textColor: '#ffffff' },
  { name: 'Lettuce', price: 8, color: '#32CD32', textColor: '#ffffff' }
];

export const SLICE_PRICES = SLICES.reduce((acc, slice) => {
  acc[slice.name] = slice.price;
  return acc;
}, {});
