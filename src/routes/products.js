const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.get("/productfind", ProductController.getAllProducts);
router.post("/add-product", ProductController.addProduct);

module.exports = router;
