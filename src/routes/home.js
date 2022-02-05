const express = require("express");
const router = express.Router();
const HomeProduct = require('../controllers/homeproduct');

router.get('', HomeProduct.getAllProducts)

module.exports = router;