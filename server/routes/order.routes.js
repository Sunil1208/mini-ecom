const { createOrder, createOrderV1 } = require("../controllers/order.controller");
const { authJwt: { verifyToken } } = require("../middleware");
const BASE_PATH = "/order";

module.exports = ( router ) => {
    router.post(
        `${BASE_PATH}/create`,
        [verifyToken],
        createOrder
    )

    router.post(
        `${BASE_PATH}/create/v1`,
        [verifyToken],
        createOrderV1
    )
};