const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

router.post('/order-product', OrderController.checkoutOrder);
router.get('/get-order-product', OrderController.getOrder);
router.get('/get-order-product/:id', OrderController.getOrderById);
router.put('/order-product/:id', OrderController.orderUpdateStatus);
router.delete('/order-product/:id', OrderController.deleteOrder);
router.get('/order-total-sales', OrderController.getOrderTotalSales)
router.get('/order-count', OrderController.orderCount)
router.get('/order-by-user/:id', OrderController.getOrderUserId)

module.exports = router;