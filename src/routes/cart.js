const router = require('express').Router();
const cartController = require('../controllers/chart-items');

router.post('/add-cart', cartController.addCart);
router.get('/get-cart/:userId', cartController.getCartByUser);

module.exports = router;