import express from 'express';
import projectRoutes from './routes/restaurant.routes.js';
import { ACCEPTED_ORIGINS, NETLIFY_REGEX } from './constants.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
   cors({
      origin: (origin, callback) => {
         if (!origin) return callback(null, true);
         if (ACCEPTED_ORIGINS.includes(origin) || NETLIFY_REGEX.test(origin)) {
            return callback(null, true);
         }
         return callback(new Error('Not allowed by CORS'));
      },
   })
);
app.use('/api', projectRoutes);

export default app;
