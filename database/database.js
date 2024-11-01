const sequelize = require("sequelize");

const connection = new sequelize('crud', 'root', 'adm1234', {
    host: 'localhost',
    dialect: 'mysql'
});

category.sync({ force: false }).then(() => { });

module.exports = connection;
