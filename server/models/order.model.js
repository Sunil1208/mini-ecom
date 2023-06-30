const db = require("../models");

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        order_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_date: {
            type: Sequelize.DATE,
        },
        total_amount: {
            type: Sequelize.FLOAT,
        },
    });
    return Order;
};