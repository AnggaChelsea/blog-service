const express = require("express");
const router = express.Router();
const registerController = require('../controllers/userController');
const profile = require('../controllers/users/profile')
const followrs = require('../controllers/users/followers')
const productNew = require('../controllers/products/getProducts')
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

router.post('/register/user', registerController.registerNew);
router.put('/user/update-profile/:id', registerController.updateUser);
router.post('/user/login', registerController.loginUser);
router.post('/user/message/:id', registerController.message);
router.post('/user/confirmationemail/:id', registerController.forgotPassword);
router.post('/rere', registerController.registeruser)
router.put('/user/changePassword/:id', registerController.changPasswordUser);
router.get('/get-all-users', registerController.getAllUser);
router.get('/get-user-by-id/:id', registerController.getUserById);
router.post('/user/checkEmail', registerController.checkEmail);

//pesan
router.put('/user/sendPesan/:id', registerController.sendpesan)
router.get('/user/findPesan/:id', registerController.findPesan)


router.put('/changepassword/:id', registerController.changePassword);
router.get('/user/:id', profile.getProfile);
router.post('/user/regis', registerController.register)
router.put('/verify/:id', registerController.verifyEmail);

router.patch('/user/follow/:id',  registerController.followeUser);
router.put('/user/followers/:id',  registerController.follow);

router.post('/user/product', productNew.createNewProducts);
router.get('/user/product', productNew.getproduct);
router.get('/user/product', registerController.getAllProducts)
router.post('/user/chat/buyyerseller', registerController.getChatByBuyer);

module.exports = router;