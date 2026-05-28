const mongoose = require('mongoose');

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/burger_builder';
  const fallbackUri = 'mongodb://127.0.0.1:27017/burger_builder';
  
  try {
    // Hide username/password in logs for security
    const maskedUri = primaryUri.includes('@') ? `mongodb+srv://...` + primaryUri.substring(primaryUri.indexOf('@')) : primaryUri;
    console.log(`Connecting to MongoDB: ${maskedUri}`);
    
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout before failing
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Primary database connection failed: ${error.message}`);
    
    if (primaryUri !== fallbackUri) {
      console.log(`Attempting fallback to local MongoDB: ${fallbackUri}`);
      try {
        const conn = await mongoose.connect(fallbackUri, {
          serverSelectionTimeoutMS: 3000 // 3 seconds timeout
        });
        console.log(`MongoDB Connected (Local Fallback): ${conn.connection.host}`);
      } catch (localError) {
        console.error(`Local MongoDB fallback also failed: ${localError.message}`);
        console.error('Please ensure MongoDB is running locally or check your network/Atlas URI.');
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
