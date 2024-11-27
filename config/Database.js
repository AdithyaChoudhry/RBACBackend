import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Use DATABASE_URL from Railway, or a fallback for local development
const DATABASE_URL = process.env.DATABASE_URL

const db = new Sequelize(DATABASE_URL, {
    dialect: "mysql",
    dialectOptions: {
    }
});

export default db;
