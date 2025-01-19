import sequelize from "../config/DBconfig.js"; 
import User from "../models/User.js"; 
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

(async () => {
  try {
    // Test the connection first
    await sequelize.authenticate(); 
    console.log('Database connected successfully!');

    // Forcefully drop and recreate the tables
    await sequelize.sync({ force: true });  
    console.log('User model synced with force: true.');
  } catch (error) {
    console.error('Error syncing user model or connecting to the database:', error);
  } finally {
    await sequelize.close();  
  }
})();
