const sequelize = require("../database");
const orders = require("../models/order.model");
const order_items = require("../models/orderItem.model");
const products = require("../models/product.model");
const users = require("../models/user.model");

const createOrder = async(req, res) => {
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
                    order_id: order.order_id
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

};

const createOrderV1 = async (req, res) => {
    const { userId } = req;
    const { order_items: user_order_items } = req.body;

    try {
        const transaction = await sequelize.transaction();

        // Get all products in a single query
        const productIds = user_order_items.map(item => item.product_id);
        const db_products = await products.findAll({ where: { product_id: productIds }, transaction });
        const db_products_map = new Map(db_products.map(item => [item.product_id, item]));

        // Check product quantity sufficiency
        for (const { product_id, quantity } of user_order_items) {
            const db_product = db_products_map.get(product_id);
            if (!db_product || db_product.in_stock < quantity) {
            await transaction.rollback();
            throw new Error('Insufficient product quantity');
            }
        }

        // Create the order
        const order = await orders.create({ user_id: userId, total_amount: 0 }, { transaction });

        // Create order items in a single query
        const orderItems = user_order_items.map(({ product_id, quantity }) => {
            const db_product = db_products_map.get(product_id);
            const amount = db_product.price * quantity;
            return {
            order_id: order.order_id,
            product_id,
            quantity,
            total_amount: amount,
            };
        });
        await order_items.bulkCreate(orderItems, { transaction });

        // Calculate the total amount
        const totalAmount = orderItems.reduce((sum, item) => sum + item.total_amount, 0);

        // Update the total amount in the order table
        await order.update({ total_amount: totalAmount }, { transaction });

        // Update product quantities in a single query
        const updatePromises = user_order_items.map(({ product_id, quantity }) => {
            const db_product = db_products_map.get(product_id);
            return db_product.decrement('in_stock', { by: quantity, transaction });
        });
        await Promise.all(updatePromises);
  
        await transaction.commit();

        return res.status(200).send({
            message: "Order created successfully!",
            status: 1,
            data: {
                order_id: order.order_id
            }
          });

    } catch (error) {
        return res.status(400).send({
            message: error.message,
            status: 0,
            data: null
          });
    }
};

const getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await orders.findByPk(orderId);
        if(!order){
            return res.status(404).send({
                message: "Order not found",
                status: 0,
                data: null
            });
        };
        const orderItems = await order_items.findAll({
            attributes: ["product_id", "quantity"],
            where: {
                order_id: orderId
            },
            raw: true,
        });
        const productIds = orderItems.map(item => item.product_id);
        const db_products = await products.findAll({
            attributes: ["name", "price", "product_id", "image"],
            where: {
                product_id: productIds
            },
            raw: true,
        });

        const productMap = db_products.reduce((acc, product) => {
            acc[product.product_id] = product;
            return acc;
        }, {});
        
        const orderItemsWithProducts = orderItems.map((orderItem) => ({
            ...orderItem,
            ...productMap[orderItem.product_id],
        }));

        const orderInfo = {
            order_id: order.order_id,
            total_amount: order.total_amount,
            created_at: order.createdAt,
            updated_at: order.updatedAt,
            items: orderItemsWithProducts,
        };
        return res.status(200).send({
            message: "",
            status: 1,
            data: orderInfo
        });
    } catch (error) {
        return res.status(400).send({
            message: error.message,
            status: 0,
            data: null
        });
    }
};

const getAllOrders = async (req, res) => {
    const {userId} = req;
  
    try {
      const db_orders = await orders.findAll({
        attributes: ["order_id", "user_id", "total_amount"],
        where: {
          user_id: userId,
        },
        raw: true,
      });
  
      const orderIds = db_orders.map((order) => order.order_id);
  
      const orderItems = await order_items.findAll({
        attributes: ["order_id", "product_id", "quantity"],
        where: {
          order_id: orderIds,
        },
        raw: true,
      });
  
      const productIds = orderItems.map((item) => item.product_id);
  
      const db_products = await products.findAll({
        attributes: ["name", "price", "product_id", "image"],
        where: {
          product_id: productIds,
        },
        raw: true,
      });
  
      const orderItemsMap = orderItems.reduce((acc, item) => {
        const orderId = item.order_id;
        if (!acc[orderId]) {
          acc[orderId] = [];
        }
        acc[orderId].push(item);
        return acc;
      }, {});
  
      const ordersData = db_orders.map((order) => {
        const orderId = order.order_id;
        const orderItemData = orderItemsMap[orderId].map((item) => {
          const product = db_products.find((p) => p.product_id === item.product_id);
          return {
            quantity: item.quantity,
            product,
          };
        });
  
        return {
          order_id: orderId,
          order_items: orderItemData,
          total_amount: order.total_amount,
          created_at: order.createdAt,
          updated_at: order.updatedAt
        };
      });
  
      console.log("ordersData", ordersData);
      return res.status(200).send({
        message: "",
        status: 1,
        data: ordersData,
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
        status: 0,
        data: null,
      });
    }
  };

module.exports = {
  createOrder,
  createOrderV1,
  getOrderById,
  getAllOrders
}