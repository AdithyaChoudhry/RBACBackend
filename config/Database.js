import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Use DATABASE_URL from Railway, or a fallback for local development
const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root:@127.0.0.1:3311/rbac'; // Fallback for local testing

const db = new Sequelize(DATABASE_URL, {
    dialect: "mysql",
    dialectOptions: {
    }
});

export default db;
