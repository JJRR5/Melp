import {
   validatePartialRestaurant,
   validateRestaurant,
   validateStats,
} from '../schemas/restaurants.js';
import Restaurant from '../models/Restaurant.js';
import { calcAverage, calcStandarDeviation } from '../utils.js';
import sequelize from '../database/db.js';
import Sequelize from 'sequelize';

export const getRestaurants = async (_, res) => {
   try {
      const restaurants = await Restaurant.findAll();
      res.json({ total: restaurants.length, data: restaurants });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
export const getRestaurant = async (req, res) => {
   try {
      const id = req.params?.id;
      if (!id) throw new Error('id is required');
      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) throw new Error('restaurant not found');
      res.json({ data: restaurant });
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};
export const createRestaurant = async (req, res) => {
   const validation = validateRestaurant(req.body);
   if (validation.success) {
      try {
         const { lat, lng } = validation.data;
         const existingRestaurant = await Restaurant.findOne({
            where: { lat, lng },
         });
         if (existingRestaurant)
            throw new Error(
               `A restaurant with these: [${lng}, ${lat}] coordinates already exists`
            );
         const newRestaurant = await Restaurant.create({
            ...validation.data,
            location: Sequelize.fn('ST_MakePoint', lng, lat),
         });
         return res.status(201).json({ data: newRestaurant });
      } catch (error) {
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
      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) throw new Error('restaurant not found');
      await restaurant.destroy();
      res.status(204).send();
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
      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) throw new Error('restaurant not found');
      restaurant.set(validation.data);
      const updatedRestaurant = await restaurant.save();
      console.log(updateRestaurant);
      res.json({ data: updatedRestaurant });
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};
export const getStats = async (req, res) => {
   const validation = validateStats(req.query);
   if (!validation.success) {
      return res.status(400).json({
         message: 'Validation failed',
         errors: validation.error.errors,
      });
   }
   try {
      const restaurantsWithinCircle = await sequelize.query(
         `SELECT * FROM restaurants 
            WHERE 
            ST_DWithin(
               location, 
               ST_SetSRID(
                  ST_MakePoint(:longitude, :latitude), 
                  4326
               )::geography, 
               :radius
            );`,
         {
            replacements: validation.data,
         }
      );
      if (restaurantsWithinCircle[0].length === 0)
         throw new Error('No restaurants found within the given circle');
      const avg = calcAverage(restaurantsWithinCircle[0]);
      const std = calcStandarDeviation(avg, restaurantsWithinCircle[0]);
      res.json({
         data: {
            count: restaurantsWithinCircle[0].length,
            avg,
            std,
         },
      });
   } catch (e) {
      res.status(404).json({ message: e.message });
   }
};
