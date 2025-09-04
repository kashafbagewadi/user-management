import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // loading env variables, it should be before importing & calling connetDB() - sequence matters

import userRoutes from './routes/userRoutes.js';
import { connectDB } from './config/db.js';
import errorMiddleware from "./middlewares/error.middleware.js";
import { limiter } from "./middlewares/rateLimit.js";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json()); // parse json data for every incoming request
app.use('/api', limiter); // ratelimited at specific API endpoint level
// app.use(limiter) // apply ratelimiter globally
app.use(errorMiddleware);
app.use('/api/user', userRoutes);
// app.use('api/product', productRoutes);
// app.use('/api/order', orderRoutes);

connectDB();

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});