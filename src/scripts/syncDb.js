import dotenv from 'dotenv';
dotenv.config();

import sequelize from '../config/DBconfig.js';
import User from '../models/User.js';
import Request from '../models/requestModel.js';
import Ticket from '../models/ticket.js';

(async () => {
  try {
    // Sync the database and create tables
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    await sequelize.sync({ alter: true });
    console.log('User model synced with the database!');
  } catch (error) {
    console.error('Error syncing the database:', error);
  } finally {
    await sequelize.close();
  }
})();
