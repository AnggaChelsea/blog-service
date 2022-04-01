const express = require('express');
const router = express.Router();
const Followers = require("../controllers/users/followers");
const auth = require("../middleware/auth");

router.post("/follow", auth,  Followers.createFollowers);
router.get("/follow", Followers.getFollowers);
router.get("/follow/:id", Followers.getFollowersById);
router.post("/unfollow/:id", Followers.removeeFollowers);
router.get("/followers/:id", Followers.countFollowers);

module.exports = router;