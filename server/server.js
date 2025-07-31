import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

// Initial Setup
dotenv.config();
connectDB();
const app = express();

// Middleware Setup
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));