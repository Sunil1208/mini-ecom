const { authJwt: { verifyToken, isAdmin, isModerator, isModeratorOrAdmin } } = require("../middleware");
const { getProductById, getProducts, addProduct, getProductsInStock } = require("../controllers/product.controller");

const BASE_PATH = "/product";

module.exports = ( router ) => {
    router.get(
        `${BASE_PATH}/all`,
        [verifyToken],
        getProducts
    );
    // get products only in stock
    router.get(
        `${BASE_PATH}/in-stock`,
        [verifyToken],
        getProductsInStock
    );
    
    // get prodct by id
    router.get(
        `${BASE_PATH}/:productId`,
        [verifyToken],
        getProductById
    );
    
    // add new product (only admin access)
    router.post(
        `${BASE_PATH}/add`,
        [verifyToken, isAdmin],
        addProduct
    ); 
};