const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const auth = require("../middleware/auth");


router.get('/homepage', ProductController.homepage)
router.get("/productfind",  ProductController.getAllProducts);
router.post("/add-product", auth, ProductController.addProductByCategory);
router.put("/update-product/:id", ProductController.updateProduct);
router.get("/count/product", ProductController.countProduct);
router.get("/get-feature", ProductController.getFeature);
router.get("/filtering-product-category", ProductController.findFilter);
router.post("/uploadimage/:id", auth, ProductController.uploadImage);
router.post("/uploadimage/:id", auth, ProductController.uploadImage);

//without validate
router.post("/addnewproduct",  ProductController.newproduct);
router.get("/product_feed", ProductController.getFeedsProduct);

router.post("/like/:id",auth , ProductController.addLikeProduct)

router.delete("/product_delete/:id", ProductController.deleteProduct)

router.get('/getproduct-by-category', ProductController.getProductbyCategory)

router.get("/filterbyCategory/:id", ProductController.filterbyCategory)

router.get('/getProductByUser/:id', ProductController.getProductByUser)

router.post('/sendMessageToBuy/:id', auth, ProductController.sendMessageToBuy)
router.get('/getMessageToBuy/:id',auth, ProductController.getMessageToBuy)

router.get('/productidby/:id', ProductController.getProductById)
// router.post('/createnewproducts', ProductController.updateProductById)

module.exports = router;