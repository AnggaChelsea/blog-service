const followersModel = require('../../models/followers');
const userModel = require('../../models/user');
class Followers {
    static async follow(req, res) {
        const {userId} = req.params.id
        const {followersId} = req.body
        const user = await userModel.findOne({
            _id: userId
        })
        const follower = await userModel.findOne({
            _id: followersId
        })
        const findFollowers = await followersModel.findOne()
        if (findFollowers <= user && findFollowers <= follower) {
            const followers = await new followersModel({
                followId: userId,
                followersId: followersId
            });
            setTimeout(() => {
                followers.save();
                res.status(201).json({
                    message: "Successfully follow",
                })
            }, 1000);
        } else {
            await followersModel.findOneAndDelete(followersId)
            res.status(400).json({
                message: "You success unfollow",
                data: user
            })
        }
    }
    // static createFollowers(req, res) {
    //     const {
    //         followid,
    //         followersId
    //     } = req.body;
    //     const findFol = followersModel.findOne({followersId});
    //     if(findFol > 0){
    //         followersModel.remove({followersId}, {followId: followid})
    //     }else{
    //         const newFollowers = new followersModel({
    //             followId: followid,
    //             followersId: followersId
    //         });
    
    //         newFollowers.save()
    //             .then(() => {
    //                 res.status(201).json({
    //                     message: "Successfully follow",
    //                     data: newFollowers
    //                 })
    //             })
    //             .catch(err => {
    //                 res.status(500).json({
    //                     message: "Error",
    //                     data: err
    //                 })
    //             })
    //     }
        
    // }
    static async getFollowers(req, res) {
        const followers = req.body
        const followersModelfind = await followersModel.findOne({
            followers: followers
        }).populate('followersId')
        if (followersModelfind) {
            res.status(200).json({
                message: "Successfully get followers",
                data: followersModelfind
            })
        } else {
            res.status(404).json({
                message: "No followers found",
            })
        }
    }
    static async getFollowersById(req, res) {
        const userId = req.params.id
        const followers = await followersModel.findOne({
            _id: userId
        }).populate('followersId')
        if (followers) {
            res.status(200).json({
                message: "Successfully get followers",
                data: followers
            })
        } else {
            res.status(404).json({
                message: "No followers found",
                data: followers
            })
        }
    }
    // static async removeeFollowers(req, res) {
    //     const followId = req.params.id
    //     const followersId = req.body
    //     const userFollower = await followersModel.findOne({
    //         followId: followId
    //     })
    //     const follower = await followersModel.findOne({
    //         followersId: followersId
    //     })
    //     if (userFollower && follower) {
    //         await userFollower.remove()
    //         await follower.remove()
    //         res.status(200).json({
    //             message: "Successfully unfollow",
    //             data: userFollower
    //         })
    //     }else{
    //         const newFollowers = new followersModel({
    //             followId: followid,
    //             followersId: followersId
    //         });
    //         newFollowers.save()
    //     }
    // }
    static async countFollowers(req, res) {
        
        const followers = await followersModel.findOne({
            followId: req.params._id
        })
        if (followers) {
            res.status(200).json({
                message: "Successfully get followers",
                data: followers
            })
        } else {
            res.status(404).json({
                message: "No followers found",
                data: followers
            })
        }
    }
}
module.exports = Followers;