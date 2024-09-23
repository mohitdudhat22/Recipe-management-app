const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorMiddleware');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const {swaggerUi , specs} = require('./utils/swagger');
const authMiddleware = require('./middleware/authMiddleware');
const connectDB = require('./config/dbConnect');
const limiter = require('./middleware/rateLimiter');
const mongoose = require('mongoose');

dotenv.config();

// Validate required environment variables
if(!process.env.MONGO_URI || !process.env.JWT_SECRET){
    console.error('Missing required environment variables');
    process.exit(1);
}

// Connect to MongoDB
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes); // Change this line
app.use('/api/recipes', authMiddleware, recipeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Global error handler
app.use(errorHandler);

// Root route
app.get('/', (req, res) => {
  res.send('Recipe Management API');
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('Server is shutting down...');
  server.close(() => {
    console.log('Express server closed.');
  });
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
  }
  process.exit(0);
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally, you can choose to exit here if it's a critical error
  // process.exit(1);
});
module.exports = app;