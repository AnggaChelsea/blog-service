const express = require("express");
const router = express.Router();
const registerController = require('../controllers/userController');


router.post('/user/register', registerController.register);
router.post('/user/login', registerController.loginUser);
router.post('/user/message/:id', registerController.message);
router.post('/user/confirmationemail/:id', registerController.confirmaitoncode);
router.post('/rere', registerController.registeruser)
router.get('/get-all-users', registerController.getAllUser);
router.get('/get-user-by-id/:id', registerController.getUserById);

router.patch('/user/forgot/:email', registerController.forgotPassword);
router.patch('/user/update/:id', registerController.updateUser);

module.exports = router;