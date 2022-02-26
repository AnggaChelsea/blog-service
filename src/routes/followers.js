const express = require('express');
const router = express.Router();
const Followers = require("../controllers/users/followers");

router.post("/follow", Followers.createFollowers);
router.get("/follow", Followers.getFollowers);
router.get("/follow/:id", Followers.getFollowersById);
router.post("/unfollow/:id", Followers.removeeFollowers);

module.exports = router;