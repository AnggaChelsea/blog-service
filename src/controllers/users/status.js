const statusModel = require('../../models/pemain/status')
const commentModel = require('../../models/comment')
class Status {
    static async createStatus(req, res){
        const {userId, gambar, status} = req.body;
        const statusData = await new statusModel({
            userId,
            gambar,
            status
        }).then(_ => {
            res.status(201).json({message: "success", status: statusData})
        }).catch(err => {
            res.status(500).json({message:err})
        })
    }
    static async getStatusByUser(req, res){
        const userId = req.body;
        const status = await statusModel.findOne(userId)
        .then(result => {
            res.status(200).json({message:'succes', data: status})
        })
    }
    static commentStatus(req, res){
        const {userId, statusId, gambar, status} = req.body;
        const commentData = await new commentModel({
            userId, statusId, gambar, status
        })
        commentData.save()
        .then(result => {
            res.status(200).json({message:'success send comment', data: commentData})
        }).catch(err => {
            res.status(500).json({message: 'error '})
        })

    }
}

module.exports = Status;