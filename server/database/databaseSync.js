const sequelize = require(".");
const orders = require("../models/order.model");
const order_items = require("../models/orderItem.model"); // these are required imports even if we don't use it
const products = require("../models/product.model");
const users = require("../models/user.model");


function defineAssociations() {
    users.hasMany(orders, { foreignKey: "user_id"})
};

(async () => {
    try {
        // Define any associations or relationships between models here

        // Synchronize the models with the database
        await defineAssociations();

        await sequelize.sync({ force: true }); // This will create the tables. Use { force: true } only during development.
        console.log("Tables created successfully");
    } catch (error) {
        console.error("Unable to create tables: ", error)
    }
})();