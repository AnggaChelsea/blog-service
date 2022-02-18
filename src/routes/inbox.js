const express = require("express");
const router = express.Router();
const inboxController = require("../controllers/inbox/inboxController");

router.post('/sendchat', inboxController.chattouser);
router.get('/inbox', inboxController.getInbox);
router.get('/getInboxByUserId/:id', inboxController.getInboxByUserId);

module.exports = router