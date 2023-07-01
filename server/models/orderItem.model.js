const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const order_items = sequelize.define('order_items', {
  order_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

module.exports = order_items;
