const express = require("express");
const router = express.Router();
const registerController = require('../controllers/userController');
const profile = require('../controllers/users/profile')
const auth = require("../middleware/auth");
const multer = require("multer");
const moment = require("moment");
const path = require('path');
const regisphone = require('../controllers/users/register')

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


router.post('/register/user-email', registerController.registerNew);
router.post('/register/user', regisphone.registerEmail);
router.put('/user/update-profile/:id', auth, uploadOption, registerController.updateUser);
router.post('/user/confirmationemail/:id', registerController.forgotPassword);
router.put('/user/changePassword/:id', registerController.changPasswordUser);
router.get('/get-all-users', registerController.getAllUser);
router.post('/user/checkEmail', registerController.checkEmail);

// router.post('/user/checkPassword', registerController.checkCodeOtpPassword);

router.put('/changepassword/:id',auth, registerController.changePassword);
router.get('/user/:id', profile.getProfile);
router.put('/verify/:id', registerController.verifyEmail);

router.put('/verify-code-otp', registerController.verifyOtp);
router.post('/login', registerController.logins)


router.post('/verify/otp-password', registerController.checkCodeOtpPassword);


router.post('/regis-phone', regisphone.regisPhone)
router.post('/regis-whatsapp', regisphone.regisWhatsapp)

module.exports = router;