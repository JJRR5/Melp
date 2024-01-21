import { Router } from 'express';
import {
   getRestaurants,
   getRestaurant,
   createRestaurant,
   deleteRestaurant,
   updateRestaurant,
   getStats,
} from '../controllers/restaurants.controller.js';
const projectRoutes = Router();

projectRoutes.get('/restaurants', getRestaurants);
projectRoutes.get('/restaurants/statistics', getStats);
projectRoutes.get('/restaurants/:id', getRestaurant);
projectRoutes.post('/restaurants', createRestaurant);
projectRoutes.patch('/restaurants/:id', updateRestaurant);
projectRoutes.delete('/restaurants/:id', deleteRestaurant);

export default projectRoutes;
