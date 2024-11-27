import { Sequelize } from "sequelize";

const db = new Sequelize('rbac', 'root', '', {
    host: "127.0.0.1",
    port: 3312, // Ensure this matches your MySQL configuration
    dialect: "mysql"
});

export default db;