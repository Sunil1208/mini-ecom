const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const users = sequelize.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING(128),
    defaultValue: '',
  },
  phone: {
    type: DataTypes.STRING(10),
    defaultValue: '',
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Assuming roles are stored as an array of strings
    defaultValue: ["user"],
  },
});

module.exports = users;