const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.get("/productfind", ProductController.getAllProducts);
router.post("/add-product", ProductController.addProduct);
router.get("/find-product-by-id/:id", ProductController.getProductbyId);
router.put("/update-product/:id", ProductController.updateProduct);
router.get("/count/product", ProductController.countProduct);
router.get("/get-feature", ProductController.getFeature);
router.get("/filtering-product-category", ProductController.findFilter);

module.exports = router;