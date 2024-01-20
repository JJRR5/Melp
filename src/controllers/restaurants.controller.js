import {
   validatePartialRestaurant,
   validateRestaurant,
} from '../schemas/restaurants.js';
import Restaurant from '../models/Restaurant.js';

export const getRestaurants = async (req, res) => {
   try {
      const restaurants = await Restaurant.findAll();
      res.json({ data: restaurants });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
export const createRestaurant = async (req, res) => {
   const validation = validateRestaurant(req.body);
   if (validation.success) {
      try {
         const newRestaurant = await Restaurant.create(validation.data);
         res.status(201).json({ data: newRestaurant });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error.message });
      }
   }
};
