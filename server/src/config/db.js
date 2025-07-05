const { DB } = require('./config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
  dialect: DB.DIALECT,
  host: DB.HOST,
  port: DB.PORT,
  logging: false, // Set to true to log SQL queries
});

module.exports = sequelize;
