const express = require("express");
const router = express.Router();
const registerController = require('../controllers/userController');


router.post('/user/register', registerController.register);
router.get('/user/getuser', registerController.getUser);

module.exports = router;