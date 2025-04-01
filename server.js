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
import http from 'http';
import https from 'https';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const httpsPort = process.env.HTTPS_PORT || 8443;
const isDevelopment = process.env.NODE_ENV !== 'production';


// Allowed origins
const allowedOrigins = [
  'https://worker-day-frontend-iihu8q46r-yohans-bekeles-projects.vercel.app',
  'https://workersday.zapto.org',
  'http://workersday.zapto.org',
  'http://localhost:5173',
  'http://localhost:3000'
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Security headers in production
if (!isDevelopment) {
  app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use('/api/register', register);
app.use('/api/auth', Auth);
app.use('/api/employees', employees);
app.use('/api/requests', request);
app.use('/api/ticket', ticket);
app.use('/api/learning', learning);

// Database connection and server startup
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Postgres Connection has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log("Data sync successfully");
    
    // Create HTTP server
    const httpServer = http.createServer(
      isDevelopment
        ? app
        : (req, res) => {
            res.writeHead(301, {
              Location: `https://${req.headers.host}${req.url}`,
            });
            res.end();
          }
    ).listen(port, "0.0.0.0", () => {
      if (isDevelopment) {
        console.log(`HTTP server running on port ${port}`);
      } else {
        console.log(`HTTP redirect server running on port ${port}`);
      }
    });
    
    // Create HTTPS server (only in production)
    let httpsServer;
    if (!isDevelopment) {
      try {
        const certPath = process.env.CERT_PATH || './certs';
        const httpsOptions = {
          cert: fs.readFileSync(`${certPath}/fullchain.pem`),
          key: fs.readFileSync(`${certPath}/privkey.pem`),
          minVersion: 'TLSv1.2',
        };
        
        httpsServer = https.createServer(httpsOptions, app)
          .listen(httpsPort, "0.0.0.0", () => {
            console.log(`HTTPS server running on port ${httpsPort}`);
            console.log(`https://workersday.zapto.org`);
          });
      } catch (error) {
        console.error('Failed to start HTTPS server:', error);
        console.log('Starting in HTTP-only mode as fallback...');
        
        // Fallback to HTTP-only if certificates can't be loaded
        httpServer.close(() => {
          http.createServer(app).listen(port, "0.0.0.0", () => {
            console.log(`HTTP server running on port ${port} (HTTPS fallback mode)`);
          });
        });
      }
    }
    
    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP & HTTPS servers');
      
      httpServer.close(() => {
        console.log('HTTP server closed');
        
        if (httpsServer) {
          httpsServer.close(() => {
            console.log('HTTPS server closed');
            process.exit(0);
          });
        } else {
          process.exit(0);
        }
      });
    });
    
    process.on('SIGINT', () => {
      console.log('SIGINT signal received: closing HTTP & HTTPS servers');
      
      httpServer.close(() => {
        console.log('HTTP server closed');
        
        if (httpsServer) {
          httpsServer.close(() => {
            console.log('HTTPS server closed');
            process.exit(0);
          });
        } else {
          process.exit(0);
        }
      });
    });
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
