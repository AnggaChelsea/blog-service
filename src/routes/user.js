const express = require("express");
const router = express.Router();
const registerController = require('../controllers/userController');


router.post('/user/register', registerController.register);
router.post('/user/login', registerController.loginUser);
router.post('/user/message/:id', registerController.message);
router.post('/user/confirmationemail/:id', registerController.confirmaitoncode);
router.post('/rere', registerController.registeruser)
router.get('/profile/:id', registerController.profile);
router.get('/get-all-users', registerController.getAllUser);



module.exports = router;