const config = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle,
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
db.products = require("../models/product.model")(sequelize, Sequelize);
db.order = require("../models/order.model")(sequelize, Sequelize);
db.order_item = require("../models/orderItem.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles"
});
db.user.belongsToMany(db.role, {
    through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];

db.user.hasMany(db.order, {
    foreginKey: "user_id"
}); //TODO: verify this

// adding foregin key constraint to order table through user_id
db.order.belongsTo(db.user, {
    foreignKey: "user_id"
});

db.order.belongsToMany(db.products, {
    through: db.order_item,
    foreginKey: "order_id"
});

db.products.belongsToMany(db.order, {
    through: db.order_item,
    foreginKey: "product_id"
});

db.order_item.belongsTo(db.order, {
    foreginKey: "order_id"
});

db.order_item.belongsTo(db.products, {
    foreginKey: "product_id"
});

// User (Table)
// - user_id (Primary Key)
// - Other user attributes

// Product (Table)
// - product_id (Primary Key)
// - Other product attributes

// Order (Table)
// - order_id (Primary Key)
// - order_date
// - Other order attributes
// - user_id (Foreign Key referencing User)

// OrderItem (Table)
// - order_item_id (Primary Key)
// - quantity
// - Other order item attributes
// - order_id (Foreign Key referencing Order)
// - product_id (Foreign Key referencing Product)

module.exports = db;