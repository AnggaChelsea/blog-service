const express = require("express");
const router = express.Router();
const registerController = require('../controllers/userController');


router.post('/user/register', registerController.register);
router.post('/user/login', registerController.loginUser);

module.exports = router;