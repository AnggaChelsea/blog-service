const express = require("express");
const router = express.Router();
const inboxController = require("../controllers/inbox/inboxController");

router.post('/sendchat', inboxController.chattouser);
router.get('/inbox', inboxController.getInbox);

module.exports = router