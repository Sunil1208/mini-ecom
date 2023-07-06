// const { createOrder, createOrderV1, getOrderById, getAllOrders } = require("../controllers/order.controller");
const { createOrder, createOrderV1, getOrderById, getAllOrders } = require("../controllers/order.controller");
const { authJwt: { verifyToken } } = require("../middleware");
const BASE_PATH = "/orders";

module.exports = ( router ) => {
    router.post(
        `${BASE_PATH}`,
        [verifyToken],
        createOrder
    )

    router.post(
        `${BASE_PATH}/v1`,
        [verifyToken],
        createOrderV1
    )

    router.get(
        `${BASE_PATH}/:orderId`,
        [verifyToken],
        getOrderById
    );

    router.get(
        `${BASE_PATH}`,
        [verifyToken],
        getAllOrders
    )
};