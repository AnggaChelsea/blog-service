const express = require("express");
const router = express.Router();
const registerController = require('../controllers/userController');


router.post('/user/register', registerController.register);
router.post('/user/login', registerController.loginUser);
router.post('/user/message/:id', registerController.message);
router.post('/user/confirmationemail/:id', registerController.confirmaitoncode);

module.exports = router;