const express = require("express");
const router = express.Router();

require("./auth.routes")(router);
require("./product.routes")(router)
require("./user.routes")(router);

module.exports = router;