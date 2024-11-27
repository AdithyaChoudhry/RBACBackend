import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(
  process.env['MYSQL_DATABASE'],
  process.env['MYSQLUSER'],
  process.env['MYSQL_ROOT_PASSWORD'],
  {
    host: process.env['MYSQLHOST'] || '127.0.0.1', // Default to IPv4 localhost
    port: process.env['MYSQLPORT'] || 3306,        // Default to 3306
    dialect: 'mysql',
    logging: false,
  }
);

export default db;