import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file (if it exists)
dotenv.config();

// Get the DATABASE_URL from environment variables
const DATABASE_URL = "mysql://root:JOOkDLKlkONETXbvhHSFbBQQkMsNxTSa@autorack.proxy.rlwy.net:22724/railway";

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined. Please set it in your environment variables.");
}

// Create a new Sequelize instance using the DATABASE_URL
const db = new Sequelize(DATABASE_URL, {
    dialect: "mysql",
    dialectOptions: {
        // Optional: Add any additional options if necessary
    }
});

export default db;