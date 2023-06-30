module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        product_id: { //TODO: this has been updated, check in the code and update wherever required
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.FLOAT,
        },
        inStock: {
            type: Sequelize.INTEGER,
        },
        description: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Product;
}