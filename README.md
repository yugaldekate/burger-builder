# Full Stack MERN Burger Builder Application

A minimalist, clean, and highly functional MERN stack (MongoDB, Express.js, React.js, Node.js) application that allows users to customize a burger layer-by-layer, adjust quantities, see instant pricing updates, add burgers to a persistent cart, and place orders stored directly in a MongoDB database.

---

## 🚀 Features

- **Interactive Burger Stack**: Visually build your burger with stacked, colored HTML div layers.
- **Slice Control Steppers**: Add ingredients, remove ingredients, and reorder slices using instant "Move Up" / "Move Down" buttons.
- **Real-Time Pricing Engine**: Base costs, discounts, extra charges, and platform fees are calculated immediately on every change.
- **Persistent Cart System**: Build multiple burgers with distinct slice configs and quantities, reviewing them collectively in the cart sidebar.
- **Validation-Backed Checkout**: Seamless checkout form capturing delivery and payment details, complete with client-side and server-side data validations.
- **MongoDB Persistence**: Finalized order documents (containing customer info, individual burger configurations, breakdowns, and aggregates) are saved to MongoDB.
- **Past Orders Viewer**: Switch views instantly to inspect past orders queried directly from the database to confirm end-to-end integration.

---

## 🛠️ Tech Stack

### Frontend
- **React.js + Vite**: High-performance rendering and build environment.
- **Axios**: Promised-based client for clean API interactions.
- **Vanilla CSS**: Curated color palette, sleek dark-accent layouts, and outfit typography.

### Backend
- **Node.js + Express.js**: Minimalist rest framework and server routing.
- **Mongoose**: Schemas, models, and robust object data modeling (ODM) for MongoDB.
- **Concurrently**: Single command workflow manager to launch frontend and backend dev tools simultaneously.
- **Nodemon**: Hot-reloading dev environment for speedy backend modifications.

---

## 📁 Project Structure

```
D:\burger-builder/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection logic
│   ├── controllers/
│   │   └── orderController.js     # Creates and gets orders
│   ├── middleware/
│   │   └── errorMiddleware.js     # Global catch and JSON error output
│   ├── models/
│   │   └── Order.js               # Mongoose Order Schema
│   ├── routes/
│   │   └── orderRoutes.js         # Order endpoint routing mapping
│   ├── utils/
│   │   └── priceCalculator.js     # Server-side pricing recalculator
│   ├── server.js                  # Express setup and entry
│   └── .env                       # Env configurations (PORT, MONGO_URI)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BurgerBuilder.jsx
│   │   │   ├── BurgerVisualization.jsx
│   │   │   ├── SliceControls.jsx
│   │   │   ├── QuantitySelector.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CheckoutForm.jsx
│   │   │   └── CartSummary.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js              # Axios configuration
│   │   ├── data/
│   │   │   └── slices.js           # Static slice metadata
│   │   ├── utils/
│   │   │   └── pricing.js          # Dynamic frontend pricing engine
│   │   ├── styles/
│   │   │   └── app.css             # Main stylesheet
│   │   ├── App.jsx                 # Top-level state and navigation routing
│   │   └── main.jsx                # DOM mounting
│   └── package.json
│
├── package.json                    # DevConcurrently startup settings
└── README.md
```

---

## 🍔 Slices & Pricing Rules

### Slices List & Base Prices
- **Aloo Tikki**: ₹20 (Dark Brown `#8B4513`)
- **Paneer**: ₹25 (Orange `#FF8C00`)
- **Cheese**: ₹15 (Yellow `#FFD700`)
- **Tomato**: ₹10 (Red `#FF6347`)
- **Onion**: ₹10 (Purple `#BA55D3`)
- **Lettuce**: ₹8 (Green `#32CD32`)

*Bread automatically exists as top and bottom layers.*

### Formula
`Total Price = (Sum of slice prices × Quantity) + Platform Fee`
- **Platform Fee**: Fixed ₹5 per custom burger configuration.

### Conditional Pricing Rules
1. **Cheese + Paneer Together**: If the burger contains at least one **Cheese** and one **Paneer**, apply a **₹3 discount**.
2. **Consecutive Aloo Tikki**: If the burger contains **two consecutive Aloo Tikki** slices, add an **extra charge of ₹2**.
3. **Splitting Warning**: If the burger contains **more than 6 custom slices**, a warning banner is shown: *"Chef suggests splitting this burger into two burgers"*.

---

## ⚙️ Setup & Execution Instructions

### Prerequisites
- [Node.js](https://nodejs.org) (v16.x or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas instance)

### Step 1: Install Root, Backend & Frontend Dependencies
From the project root (`D:\burger-builder`), run:
```bash
# Installs root 'concurrently' dependency
npm install

# Installs backend dependencies
cd backend
npm install

# Installs frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables
Create a `.env` file in the `backend/` directory (you can clone `backend/.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/burger_builder
NODE_ENV=development
```
*Note: Set your MongoDB Atlas URI in `MONGO_URI` if you prefer to use a cloud-hosted database instead of local MongoDB.*

### Step 3: Run the Application
From the root directory (`D:\burger-builder`), launch the full application with a single command:
```bash
npm run dev
```
This launches:
- **Express Backend Server** on `http://localhost:5000` (monitored with Nodemon)
- **Vite React Dev Server** on `http://localhost:5173` (or the next available port)

Open your browser and navigate to `http://localhost:5173` to build a burger!
