const sequelize = require("sequelize");

const connection = new sequelize('crud', 'root', 'adm1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;