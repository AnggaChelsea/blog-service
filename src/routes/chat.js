const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatroomController");
const userController = require("../controllers/userController");
const messagec = require("../controllers/messageController");
const InboxC = require('../controllers/inbox/inboxController')
 
router.post("/send-message", chatController.ChatUser);
router.get('/detail-inbox/:id', InboxC.getInboxById)
router.post('/send-messageintouser', InboxC.sendMessageForBuy)
router.put('/send-messageintoseller/:id', messagec.sendMessage)
router.put('/send-pesan-to-buy/:id', userController.sendPesan)
router.post('/send-pesan-to-seller/:id', messagec.sendMessage1)
router.get('/get-pesan-by-buyyer/:id', messagec.getPesanByBuyyerId)
module.exports = router; 