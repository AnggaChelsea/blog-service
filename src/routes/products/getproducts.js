const express = require('express');
const router = express.Router();
const productC = require('../../controllers/products/getProducts');

router.get('/products_get', productC.getproduct);
router.post('/products_create', productC.createNewProducts);

module.exports = router;