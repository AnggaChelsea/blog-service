const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const auth = require("../middleware/auth");
const multer = require("multer");
const MIME_TYPE = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
}
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = MIME_TYPE[file.mimetype];
    let uploadError = new Error("Invalid mime type");
    if(isValid){
      uploadError = null;
      cb(null, "assets/images");
    }else{
      cb(uploadError, "file iss not support");
    }
   
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1000 + '-' + extension)
    cb(null, suffix + "-" + fileName);
  }
})
const uploadOption = multer({
  storage: storage
}).single("image");
router.get("/productfind", ProductController.getAllProducts);
router.put("/update-product/:id", ProductController.updateProduct);
router.put('/update-product-image/:id', auth, uploadOption, ProductController.updateProductImage);
router.get("/count/product", ProductController.countProduct);
router.get("/get-feature", ProductController.getFeature);
router.get("/filtering-product-category", ProductController.findFilter);

//without validate
router.post("/addnewproduct", uploadOption, ProductController.newproduct);

router.post("/like/:id", ProductController.addLikeProduct)

router.delete("/product_delete/:id", ProductController.deleteProduct)

router.get('/getproduct-by-category', ProductController.getProductbyCategory)

router.get("/filterbyCategory/:id", ProductController.filterbyCategory)

router.get('/getProductByUser/:id', ProductController.getProductByUser)

router.post('/sendMessageToBuy/:id', auth, ProductController.sendMessageToBuy)
router.get('/getMessageToBuy/:id', auth, ProductController.getMessageToBuy)

router.get('/productidby/:id', ProductController.getProductById)
// router.post('/createnewproducts', ProductController.updateProductById)
router.post('/cari-product', ProductController.filterProductNew)

router.post('/filter-by-alamat', ProductController.filterByAlamat)

module.exports = router;