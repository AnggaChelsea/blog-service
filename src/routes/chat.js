const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatroomController");
const userController = require("../controllers/userController");
const InboxC = require('../controllers/inbox/inboxController')

router.post("/send-message", chatController.ChatUser);
router.get('/detail-inbox/:id', InboxC.getInboxById)
router.post('/send-messageintouser', InboxC.sendMessageForBuy)
module.exports = router;