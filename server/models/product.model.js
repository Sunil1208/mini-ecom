const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const products = sequelize.define('products', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  in_stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  description: {
    type: DataTypes.STRING(2056),
    defaultValue: '',
  },
  image: {
    type: DataTypes.STRING(1024),
    defaultValue: '',
  },
});

module.exports = products;
