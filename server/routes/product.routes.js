const express = require("express");
const router = express.Router();

const { authJwt: { verifyToken, isAdmin, isModerator, isModeratorOrAdmin } } = require("../middleware");
const { getProductById, getProducts, addProduct, getProductsInStock } = require("../controllers/product.controller");

// get all product
router.get(
    "/all",
    [verifyToken],
    getProducts
);
// get products only in stock
router.get(
    "/in-stock",
    [verifyToken],
    getProductsInStock
);

// get prodct by id
router.get(
    "/:productId",
    [verifyToken],
    getProductById
);

// add new product (only admin access)
router.post(
    "/add",
    [verifyToken, isAdmin],
    addProduct
);

module.exports = router;