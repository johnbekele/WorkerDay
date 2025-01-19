import sequelize from '../config/DBconfig.js';
import defineUserModel from '../models/User.js';

(async () => {
  try {
    // Define the User model
    const User = defineUserModel(sequelize);

    // Sync the database and create the table
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate the table
    console.log('User model synced with the database!');
  } catch (error) {
    console.error('Error syncing the database:', error);
  } finally {
    await sequelize.close();
  }
})();
