const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatroomController");
const userController = require("../controllers/userController");

router.post("/send-message", chatController.ChatUser);
router.post("/send-messageintouser",userController.sendmessagetouser)
module.exports = router;