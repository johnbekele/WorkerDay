import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/DBconfig.js';
import register from './src/routes/register.js';
import bodyParser from 'body-parser';
import Auth from './src/routes/Auth.js';
import employees from './src/routes/api/employees.js';
import request from './src/routes/api/request.js';
import ticket from './src/routes/api/ticket.js';
import learning from './src/routes/api/learning.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Api routes

//Auth routes
app.use('/api/register', register);
app.use('/api/auth', Auth);

//resorce routes

app.use('/api/employees', employees);

//request routes

app.use('/api/requests', request);
app.use('/api/ticket', ticket);
app.use('/api/learning', learning);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Postgress Connection has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log("Data sync succesfully  ");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
