import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.DB_USER || 'your_user',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'your_database',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER || 'your_user',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'your_test_database',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER || 'your_user',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'your_production_database',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
};
