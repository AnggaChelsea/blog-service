const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const auth = require("../middleware/auth");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("./assets/images/"));
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, fileName + "-" + Date.now());
    },
  });

  const uploadOption = multer({
    storage: storage,
  });

router.get("/productfind",  ProductController.getAllProducts);
router.put("/update-product/:id", ProductController.updateProduct);
router.get("/count/product", ProductController.countProduct);
router.get("/get-feature", ProductController.getFeature);
router.get("/filtering-product-category", ProductController.findFilter);

//without validate
router.post("/addnewproduct",  multer({ storage: storage }).single("photo"), ProductController.newproduct);

router.post("/like/:id" , ProductController.addLikeProduct)

router.delete("/product_delete/:id", ProductController.deleteProduct)

router.get('/getproduct-by-category', ProductController.getProductbyCategory)

router.get("/filterbyCategory/:id", ProductController.filterbyCategory)

router.get('/getProductByUser/:id', ProductController.getProductByUser)

router.post('/sendMessageToBuy/:id', auth, ProductController.sendMessageToBuy)
router.get('/getMessageToBuy/:id',auth, ProductController.getMessageToBuy)

router.get('/productidby/:id', ProductController.getProductById)
// router.post('/createnewproducts', ProductController.updateProductById)
router.post('/cari-product', ProductController.filterProductNew)

router.post('/filter-by-alamat', ProductController.filterByAlamat)

module.exports = router;