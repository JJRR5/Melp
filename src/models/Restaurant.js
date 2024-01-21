import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Restaurant = sequelize.define(
   'restaurants',
   {
      id: {
         type: DataTypes.UUID,
         primaryKey: true,
         defaultValue: DataTypes.UUIDV4,
      },
      rating: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            min: 0,
            max: 4,
         },
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      site: {
         type: DataTypes.STRING,
      },
      email: {
         type: DataTypes.STRING,
      },
      phone: {
         type: DataTypes.STRING,
      },
      street: {
         type: DataTypes.STRING,
      },
      city: {
         type: DataTypes.STRING,
      },
      state: {
         type: DataTypes.STRING,
      },
      lat: {
         type: DataTypes.FLOAT,
         allowNull: false,
      },
      lng: {
         type: DataTypes.FLOAT,
         allowNull: false,
      },
      location: {
         type: DataTypes.GEOMETRY('POINT', 4326),
      },
   },
   {
      timestamps: false,
   }
);

export default Restaurant;
