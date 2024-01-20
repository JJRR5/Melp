import { Router } from 'express';
import {
   getRestaurants,
   createRestaurant,
} from '../controllers/restaurants.controller.js';
const projectRoutes = Router();

projectRoutes.get('/restaurants', getRestaurants);
projectRoutes.get('/restaurants/:id', getRestaurants);
projectRoutes.get('/restaurants/statistics');
projectRoutes.post('/restaurants', createRestaurant);
projectRoutes.patch('/restaurants/:id');
projectRoutes.delete('/restaurants/:id');

export default projectRoutes;
