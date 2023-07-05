const { createOrder } = require("../controllers/order.controller");
const { authJwt: { verifyToken } } = require("../middleware");
const BASE_PATH = "/order";

module.exports = ( router ) => {
    router.post(
        `${BASE_PATH}/create`,
        [verifyToken],
        createOrder
    )
};