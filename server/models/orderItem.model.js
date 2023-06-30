const db = require("../models");

module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("order_item", {
        order_item_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: Sequelize.INTEGER,
        },
        total_amount: {
            type: Sequelize.FLOAT,
        },
    });
    return OrderItem;
};