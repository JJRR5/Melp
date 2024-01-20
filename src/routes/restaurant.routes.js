import { Router } from 'express';
import {
   getRestaurants,
   getRestaurant,
   createRestaurant,
   deleteRestaurant,
   updateRestaurant,
} from '../controllers/restaurants.controller.js';
const projectRoutes = Router();

projectRoutes.get('/restaurants', getRestaurants);
projectRoutes.get('/restaurants/:id', getRestaurant);
projectRoutes.get('/restaurants/statistics');
projectRoutes.post('/restaurants', createRestaurant);
projectRoutes.patch('/restaurants/:id', updateRestaurant);
projectRoutes.delete('/restaurants/:id', deleteRestaurant);

export default projectRoutes;
