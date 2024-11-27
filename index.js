// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import required modules
import express from 'express';
import { Sequelize } from 'sequelize';

// Initialize Express application
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Initialize Sequelize with database connection details
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQLUSER, process.env.MYSQL_ROOT_PASSWORD, {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql',
});

// Middleware to parse JSON requests
app.use(express.json());

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, world! Your Express app is running.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});