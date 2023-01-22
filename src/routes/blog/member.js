const express = require('express');
const router = express.Router();
const memberController = require('../../controllers/blog/member')

router.post('/register',memberController.register)
router.get('/get-member', memberController.getMember)
router.post('/login', memberController.login)
router.put('/verify-otp', memberController.verifyOtp)

module.exports = router