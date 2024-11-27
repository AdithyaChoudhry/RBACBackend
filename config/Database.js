import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQLUSER, process.env.MYSQL_ROOT_PASSWORD, {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql',
});

// Authenticate
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });