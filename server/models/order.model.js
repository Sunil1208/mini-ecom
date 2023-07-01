const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const orders = sequelize.define('orders', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

module.exports = orders;