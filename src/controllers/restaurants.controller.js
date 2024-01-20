import {
   validatePartialRestaurant,
   validateRestaurant,
} from '../schemas/restaurants.js';
import Restaurant from '../models/Restaurant.js';

export const getRestaurants = async (_, res) => {
   try {
      const restaurants = await Restaurant.findAll();
      res.json({ data: restaurants });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
export const getRestaurant = async (req, res) => {
   try {
      const id = req.params?.id;
      if (!id) throw new Error('id is required');
      const restaurant = await Restaurant.findOne({ where: { id } });
      res.json({ data: restaurant });
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};
export const createRestaurant = async (req, res) => {
   const validation = validateRestaurant(req.body);
   if (validation.success) {
      try {
         const newRestaurant = await Restaurant.create(validation.data);
         return res.status(201).json({ data: newRestaurant });
      } catch (error) {
         console.log(error);
         return res.status(500).json({ message: error.message });
      }
   }
   res.status(400).json({
      message: 'Validation failed',
      errors: validation.error.errors,
   });
};
export const deleteRestaurant = async (req, res) => {
   try {
      const id = req.params?.id;
      if (!id) throw new Error('id is required');
      const restaurant = await Restaurant.findOne({ where: { id } });
      if (!restaurant) throw new Error('restaurant not found');
      await restaurant.destroy();
      res.json({ data: restaurant });
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};
export const updateRestaurant = async (req, res) => {
   const validation = validatePartialRestaurant(req.body);
   if (!validation.success) {
      return res.status(400).json({
         message: 'Validation failed',
         errors: validation.error.errors,
      });
   }
   try {
      const id = req.params?.id;
      if (!id) throw new Error('id is required');
      const restaurant = await Restaurant.findOne({ where: { id } });
      if (!restaurant) throw new Error('restaurant not found');
      restaurant.set(validation.data);
      const updatedRestaurant = await restaurant.save();
      console.log(updateRestaurant);
      res.json({ data: updatedRestaurant });
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};
