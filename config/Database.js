import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize('railway', 'root','JOOkDLKlkONETXbvhHSFbBQQkMsNxTSa', {
  host: "mysql.railway.internal",
  port: 33765, // Ensure this matches your MySQL configuration
  dialect: "mysql"
});

export default db;
