const express = require('express');
const router = express.Router();
const Followers = require("../controllers/users/followers");
const auth = require("../middleware/auth");

router.post("/getfollowers", Followers.getFollowers);
router.get("/follow/:id", Followers.getFollowersById);
router.get("/followers/:id", Followers.countFollowers);
router.post('/followersbyuser/:id', Followers.follow);

module.exports = router;