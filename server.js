import express from 'express';
import logger from './middleware/logger.js';
import tasksRoutes from './routes/tasksRoutes.js';
import errorHandler from './middleware/error.js';

const app = express();

// Middleware to parse json
app.use(express.json());

//Middleware Logger
app.use(logger);

// Routes
app.use('/api/tasks', tasksRoutes);

// Error Middleware
app.use(errorHandler);

app.listen(8000, () => console.log('Server Online'));