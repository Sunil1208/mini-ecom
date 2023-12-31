const { Op } = require("sequelize");
const Products = require("../models/product.model");

const getProducts = (req, res) => {
    Products.findAll().then(products => {
        return res.status(200).send({
            message: "",
            data: products,
            status: products ? 1 : 0
        })
    })
    .catch(err => {
        return res.status(500).send({
            message: err.message,
            data: [],
            status: 0,
        });
    });
};

const getProductsInStock = (req, res) => {
    Products.findAll({
        where: {
            in_stock: {
                [Op.gt]: 0
            }
        }
    }).then(products => {
        return res.status(200).send({
            message: "",
            data: products,
            status: products ? 1 : 0
        })
    })
    .catch(err => {
        return res.status(500).send({
            message: err.message,
            data: [],
            status: 0,
        });
    });
};

const getProductById = (req, res) => {
    Products.findOne({
        where: {
            product_id: req.params.productId
        }
    })
    .then(product => {
        return res.status(200).send({
            data: product,
            message: product ? "" : "No such product found!",
            status: product ? 1 : 0
        })
    })
    .catch(err => {
        return res.status(500).send({
            message: err.message,
            data: null,
            status: 0
        });
    });
};

const addProduct = (req, res) => {
    const requiredFields = ["name", "description", "image", "price", "in_stock"];
    console.log("req body ", req.body)
    for (let i = 0; i < requiredFields.length; i++) {
        if(!req.body[requiredFields[i]]){
            return res.status(400).send({
                message: `${requiredFields[i]} is mandatory!`,
                status: 0
            });
        }
    }
    // Save Product to database
    const { name, price, in_stock, description, image } = req.body;
    Products.create({
        name: name,
        price: price,
        in_stock: in_stock,
        description: description,
        image: image
    }).then(product => {
        console.log("PRODUCT REGISTRATION", product);
        return res.status(200).send({
            message: "Product added successfully!",
            status: 1,
        });
    })
    .catch(err => {
        return res.status(400).send({
            message: err.message,
            status: 0
        });
    });
};

module.exports = {
    getProducts,
    getProductById,
    getProductsInStock,
    addProduct
}