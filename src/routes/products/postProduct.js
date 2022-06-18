const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/productController");
const auth = require("../../middleware/auth");
const multer = require("multer");
const moment = require("moment");
const path = require('path');


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

router.post('/add-new', uploadOption, ProductController.newproductwe)

module.exports = router;