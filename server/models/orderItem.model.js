const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const products = require('./product.model');
const orders = require('./order.model');

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
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: orders,
      key: 'order_id',
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: products,
      key: 'product_id',
    },
  },
});

module.exports = order_items;
