const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const auth = require("../middleware/auth");
const multer = require("multer");
const moment = require("moment");
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
    const date = Date.now();
    const daTime = new Date()
    //format date
    const getTime = daTime.getHours() + "-" + daTime.getMinutes() + "-" + daTime.getSeconds();
    const formatdate = moment(date).format("DD-MM-YYYY");
    const suffix = formatdate + '-' + getTime
    cb(null, suffix + "-" + fileName);
  }
})
const uploadOption = multer({
  storage: storage
}).single("image");
router.post("/addnewproduct", ProductController.newproduct);
router.post('/add-new', ProductController.newproductwe)

router.get("/productfind", ProductController.getAllProducts);
router.put("/update-product/:id", ProductController.updateProduct);
router.put('/update-product-image/:id', auth, uploadOption, ProductController.updateProductImage);
router.get("/count/product", ProductController.countProduct);
router.get("/get-feature", ProductController.getFeature);

router.get('/get-coment-byid/:id', ProductController.getComment);
router.get('/productid/:id', ProductController.getProductByIdx)

//without validate

router.put("/like/:id", ProductController.addLikeProduct)

router.put('/comment/:id', ProductController.commentProduct)

router.delete("/product_delete/:id", ProductController.deleteProduct)

router.get('/getproduct-by-category', ProductController.getProductbyCategory)

router.get("/filterbyCategory/:id", ProductController.filterbyCategory)

router.get('/getProductByUser/:id', ProductController.getProductByUser)
router.get('/feed-product', ProductController.feedProduct)

router.post('/sendMessageToBuy/:id', auth, ProductController.sendMessageToBuy)
router.get('/getMessageToBuy/:id', auth, ProductController.getMessageToBuy)

router.put('/productidby/:id', ProductController.getProductById)
// router.post('/createnewproducts', ProductController.updateProductById)
router.post('/cari-product', ProductController.filterProductNew)

router.post('/filter-by-alamat', ProductController.filterByAlamat)

router.get('/get-product/?name', ProductController.filterbyname)

router.get('/get-product-by-filter/:query', ProductController.findDuluProduct)

router.put('/reply-comment/:id', ProductController.reply)

module.exports = router;