const sequelize = require(".");
const defineAssociations = require("../models/association");
const roles = require("../models/role.model");

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