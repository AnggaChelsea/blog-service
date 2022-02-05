const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const jwtAdmin = require("../middleware/jwtAdmin");

router.get('/homepage', ProductController.homepage)
const jwtadminn = jwtAdmin();
router.get("/productfind", jwtadminn, ProductController.getAllProducts);
router.post("/add-product", jwtadminn, ProductController.addProduct);
router.get("/find-product-by-id/:id", ProductController.getProductbyId);
router.put("/update-product/:id", ProductController.updateProduct);
router.get("/count/product", ProductController.countProduct);
router.get("/get-feature", ProductController.getFeature);
router.get("/filtering-product-category", ProductController.findFilter);

module.exports = router;