const router = require('express').Router();
const cartController = require('../controllers/chart-items');

router.post('/add-cart', cartController.addCart);
router.get('/get-cart/:userId', cartController.getCartByUser);
router.patch('/checkout-cart/:cartId', cartController.checkout);
router.get('/get-order-id/:orderId', cartController.getOrderByUser);
router.get('/get-transaction/:userId', cartController.getTransactionById);

module.exports = router;