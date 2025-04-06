import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongo.js';
import authRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/', authRoutes);  // Changed to /api for better route organization
app.use('/items', itemRoutes);  // Add route for items

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});