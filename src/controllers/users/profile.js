const userModel = require("../../models/user");

class Profile {
    static async getProfile(req, res) {
        const profile = await userModel.findById(req.params.id);
        const countFollower = 0
        for(let i = 0; i < profile.length; i++) {
            countFollower = profile[i].followers.length
        }
        console.log(countFollower)
        if (!profile) {
            res.status(400).json({
                message: "Profile not found",
                data: profile,
                followers:countFollowers
            })
        }
        res.status(200).json({
            message: "Successfully get profile",
            data: profile
        })
    }
    static async follow(req, res) {
        const userId = req.params.id
        const followersId = req.params.body
        const user = await userModel({
            _id: userId
        })
        const follower = await userModel({
            _id: followersId
        })
        user.followers.push(follower._id)
        await user.save()
        res.status(200).json({
            message: "Successfully follow",
            data: user
        })
    }
}
module.exports = Profile;