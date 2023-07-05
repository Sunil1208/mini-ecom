const sequelize = require("../database");
const orders = require("../models/order.model");
const order_items = require("../models/orderItem.model");
const products = require("../models/product.model");
const users = require("../models/user.model");

exports.createOrder = async(req, res) => {
    const user_id = req.userId;
    const { order_items: user_order_items } = req.body;

    try {
        await sequelize.transaction(async (transaction) => {
            // get all products
            const product_ids = user_order_items.map(item => item.product_id);
            const db_products = await products.findAll({ where: { product_id: product_ids}});
            const db_products_map = db_products.reduce((acc, item) => {
                if(!acc[item.product_id]){
                    acc[item.product_id] = item;
                };
                return acc;
            }, {});
            
            // check product quanity sufficiency
            for(const { product_id, quantity } of user_order_items) {
                console.log("QUANITY IS ", quantity)
                const db_product = db_products_map[product_id];
                if (!db_product || db_product.in_stock < quantity) {
                    throw new Error('Insufficient product quantity');
                  }
            }

            // create the order
            const order = await orders.create({ user_id, total_amount: 0 }, { transaction });

            // create order items
            const orderItems = [];
            for(const { product_id, quantity } of user_order_items ){
                const db_product = db_products_map[product_id];
                const amount = db_product.price * quantity;
                const order_item = await order_items.create({ 
                    order_id: order.order_id,
                    product_id,
                    quantity,
                    total_amount: amount,
                }, { transaction });
                orderItems.push(order_item);
            };

            // calculate and update the total amount in order table
            const totalAmount = orderItems.reduce((sum, item) => sum + item.total_amount, 0);
            await order.update({ total_amount: totalAmount }, { transaction });

            // update product quanitites
            for (const { product_id, quantity } of user_order_items) {
                const db_product = db_products_map[product_id];
                await db_product.decrement('in_stock', { by: quantity, transaction });
            };

            return res.status(200).send({
                message: "Order created successfully!",
                status: 1,
                data: {
                    ...order,
                    // items: 
                }
            });

        })
    } catch (error) {
        return res.status(400).send({
            message: error.message,
            status: 0,
            data: null
        })
    }

}