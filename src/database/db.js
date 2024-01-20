import Sequelize from 'sequelize';

const sequelize = new Sequelize('melp', 'pepe', 'callofduty4', {
   host: 'localhost',
   dialect: 'postgres',
});

export default sequelize;
