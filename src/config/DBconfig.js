import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,  
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
  username: process.env.DB_USER,  
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_NAME,  
  dialectOptions: {
    ssl: {
      require: true, // Enforce SSL connection
      rejectUnauthorized: false, // Allows self-signed certificates
    },
  },
  logging: false, // Disable logging (optional)
});

export default sequelize;
