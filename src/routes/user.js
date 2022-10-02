const express = require("express");
const router = express.Router();
const registerController = require('../controllers/userController');
const profile = require('../controllers/users/profile')
const followrs = require('../controllers/users/followers')
const productNew = require('../controllers/products/getProducts')
const auth = require("../middleware/auth");
const multer = require("multer");
const moment = require("moment");
const path = require('path');
const simple = require('../controllers/simpleController');
const regisosi = require('../controllers/userosiController')

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
      cb(null, "src/assets/images/products");
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


router.post('/register/user', uploadOption, registerController.registerNew);
router.put('/user/update-profile/:id', auth, uploadOption, registerController.updateUser);
router.post('/user/message/:id',auth, registerController.message);
router.post('/user/confirmationemail/:id', registerController.forgotPassword);
router.put('/user/changePassword/:id', registerController.changPasswordUser);
router.get('/get-all-users', registerController.getAllUser);
router.get('/get-user-by-id/:id', registerController.getUserById);
router.post('/user/checkEmail', registerController.checkEmail);

router.post('/regissimple', simple.signup)
router.post('/loginsimple', simple.login)

// router.post('/user/checkPassword', registerController.checkCodeOtpPassword);
router.post('/user/check-kode-otp-password', registerController.checkCodeOtpPassword);
router.get('/user/get-user-pesan/:userid', registerController.getPesan);

//pesan
router.put('/user/sendPesan/:id', auth, registerController.sendpesan)
router.get('/user/findPesan/:id', auth, registerController.findPesan)
router.get('/get-pesan/:id', auth, registerController.getPesan)

router.put('/changepassword/:id',auth, registerController.changePassword);
router.get('/user/:id', profile.getProfile);
router.put('/verify/:id', registerController.verifyEmail);

router.patch('/user/follow/:id', auth,  registerController.followeUser);
router.put('/user/followers/:id', auth, registerController.follow);

router.post('/user/product', productNew.createNewProducts);
router.get('/user/product', productNew.getproduct);
router.get('/user/product', registerController.getAllProducts)
router.post('/user/chat/buyyerseller', registerController.getChatByBuyer);

router.put('/verify-code-otp', registerController.verifyOtp);
router.post('/login', registerController.logins)

router.get('/get/followers/:id', registerController.getFollowers);

router.post('/verify/otp-password', registerController.checkCodeOtpPassword);

router.post('/regisosi', regisosi.registerosi)

module.exports = router;