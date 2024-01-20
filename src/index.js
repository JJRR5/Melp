import app from './app.js';
import sequelize from './database/db.js';
import './models/Restaurant.js';

const PORT = process.env.PORT || 3000;

async function main() {
   try {
      await sequelize.sync();
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   } catch (e) {
      console.log(e);
   }
}
main();
