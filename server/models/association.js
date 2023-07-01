const orders = require("./order.model");
const order_items = require("./orderItem.model");
const products = require("./product.model");
const users = require("./user.model");

function defineAssociations() {
    orders.belongsTo(users, { foreignKey: 'user_id' });
    orders.hasMany(order_items, { foreignKey: 'order_id' });
    order_items.belongsTo(orders, { foreignKey: 'order_id' });
    order_items.belongsTo(products, { foreignKey: 'product_id' });
};

module.exports = defineAssociations;
