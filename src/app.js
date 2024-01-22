import express from 'express';
import projectRoutes from './routes/restaurant.routes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', projectRoutes);

export default app;
