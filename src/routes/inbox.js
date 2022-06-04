const express = require("express");
const router = express.Router();
const inboxController = require("../controllers/inbox/inboxController");

router.post('/sendchat', inboxController.chattouser);
router.get('/inbox/:id', inboxController.getInbox);
router.get('/getInboxByUserId/:id', inboxController.getInboxByUserId);
router.get('/detail-inbox/:id', inboxController.getInboxById);
router.post('/message', inboxController.sendMessage);

module.exports = router