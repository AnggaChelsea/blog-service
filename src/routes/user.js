const express = require("express");
const router = express.Router();
const registerController = require('../controllers/userController');
const profile = require('../controllers/users/profile')
const auth = require("../middleware/auth");
const regisphone = require('../controllers/users/register')



router.post('/register/user-email', registerController.registerNew);
router.post('/register/user', regisphone.registerEmail);
router.put('/user/update-profile/:id',  registerController.updateUser);
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


// router.post('/regis-phone', regisphone.regisPhone)
// router.post('/regis-whatsapp', regisphone.regisWhatsapp)

module.exports = router;