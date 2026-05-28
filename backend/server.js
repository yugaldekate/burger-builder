const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const dns = require("node:dns"); 

// Load env vars
dotenv.config({ override: true });

// or for promises: const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Cloudflare and Google DNS

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/orders', orderRoutes);

// Base route health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Burger Builder API is active' });
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
