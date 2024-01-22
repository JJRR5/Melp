import Sequelize from 'sequelize';

let sequelize;
const config = {
   host: process.env.DB_HOST,
   dialect: 'postgres',
};
if (process.env.NODE_ENV === 'production') {
   config.dialectOptions = {
      ssl: {
         require: true,
         rejectUnauthorized: false,
      },
   };
   sequelize = new Sequelize(process.env.DB_URL, config);
} else {
   sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      config
   );
}

try {
   await sequelize.authenticate();
   console.log('Connection has been established successfully.');
} catch (error) {
   console.error('Unable to connect to the database:', error);
}

export default sequelize;
