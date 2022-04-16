const express = require("express");
const router = express.Router();
const registerController = require('../controllers/userController');
const profile = require('../controllers/users/profile')
const followrs = require('../controllers/users/followers')
const productNew = require('../controllers/products/getProducts')
const auth = require("../middleware/auth");

router.post('/user/register', registerController.register);
router.post('/user/login', registerController.loginUser);
router.post('/user/message/:id', registerController.message);
router.post('/user/confirmationemail/:id', registerController.confirmaitoncode);
router.post('/rere', registerController.registeruser)
router.get('/get-all-users', registerController.getAllUser);
router.get('/get-user-by-id/:id', registerController.getUserById);

router.patch('/user/forgot/:email', registerController.forgotPassword);
router.patch('/user/update/:id', registerController.updateUser);

router.get('/user/:id', profile.getProfile);

router.patch('/user/follow/:id',  registerController.followeUser);
router.post('/user/followers/:id',  followrs.follow);

router.post('/user/product', productNew.createNewProducts);
router.get('/user/product', productNew.getproduct);
router.get('/user/product', registerController.getAllProducts)
router.post('/user/chat/buyyerseller', registerController.getChatByBuyer);

module.exports = router;