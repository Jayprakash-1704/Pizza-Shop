
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // 1. Must import this

import pizzaRoutes from './routes/pizzaRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();


app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://pizza-shop-frontend-ysby.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); 



// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
