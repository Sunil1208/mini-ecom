const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const users = require('./user.model');

const orders = sequelize.define('orders', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total_amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: users,
      key: 'user_id',
    },
  },
});

module.exports = orders;