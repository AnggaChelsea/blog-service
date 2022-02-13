const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const auth = require("../middleware/auth");
const jwtAdmin = require("../middleware/jwtAdmin");

router.get('/homepage', ProductController.homepage)
router.get("/productfind", ProductController.getAllProducts);
router.post("/add-product", ProductController.addProductByCategory);
router.get("/find-product-by-id/:id", ProductController.getProductbyId);
router.put("/update-product/:id", ProductController.updateProduct);
router.get("/count/product", ProductController.countProduct);
router.get("/get-feature", ProductController.getFeature);
router.get("/filtering-product-category", ProductController.findFilter);
router.post("/uploadimage/:id", ProductController.uploadImage);
router.post("/uploadimage/:id", ProductController.uploadImage);

//without validate
router.post("/addnewproduct", ProductController.newproduct);
router.get("/product_feed", ProductController.getFeedsProduct);

router.post("/like/:id", ProductController.addLikeProduct)

router.delete("/product_delete/:id", ProductController.deleteProduct)

module.exports = router;