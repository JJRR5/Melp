'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface) {
      return queryInterface.sequelize.query(`
        CREATE INDEX "idx_restaurant_location" ON "restaurants" USING GIST ("location");
      `);
   },

   async down(queryInterface) {
      return queryInterface.sequelize.query(`
        DROP INDEX "idx_restaurant_location";
      `);
   },
};
