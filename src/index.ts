// src/index.ts

import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction,
} from 'express';

import { loggerMiddleware } from './middleware/logger.middleware';
import connectDB from './db';
import router from './routes';
import dotenv from 'dotenv';
dotenv.config();

// Create an Express.js application
const app: Application = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Base route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to DrBroker!');
});

// Middlewares
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/api', router);

app.listen(port, () => {
  console.log(`🚀 Server is Fire at http://localhost:${port}`);
});
