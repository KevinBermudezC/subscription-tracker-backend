import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

// Create an Express app
const app = express();
app.enable('trust proxy');
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

// Add middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// Add the routes to the app
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

// Add the error middleware to the app
app.use(errorMiddleware);

// Define a route handler for the root of the app
app.get('/',  (req,res) => {
    res.send('Welcome to the Subscription Tracker API');
})

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Start the app on the specified port
app.listen(PORT,async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    // Connect to the database
    await connectToDatabase();
})

export default app;