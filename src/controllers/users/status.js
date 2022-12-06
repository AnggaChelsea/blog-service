const statusModel = require('../../models/pemain/status')
const commentModel = require('../../models/pemain/comment')
class Status {
    static async createStatus(req, res){
        const {pemainId, gambar, status, like} = req.body;
        const statusData = await new statusModel({
            pemainId,
            gambar,
            status,
            like
        })
        await statusData.save();
        if(statusData){
            return res.status(200).json({
                status: statusData.message,
                data: statusData
            })
        }else{
            return res.status(200).json({
                status: 'error',
                message: 'error post status'
            })
        }
    }
    static async getStatusByUser(req, res){
        const pemainId = req.body;
        const status = await statusModel.findOne(pemainId).populate('pemainId')
        if(pemainId){
            return res.status(200).json({
                status: status.message,
                data: status
            })
        }else{
            return res.status(200).json({
                status: 'error',
                message: 'error get status'
            })
        }
    }
    static async getAllStatus(req, res){
        const status = await statusModel.find({}).populate('pemainId')
        if(status){
            return res.status(200).json({
                status: status.message,
                data: status
            })
        }else{
            return res.status(200).json({
                status: 'error',
                message: 'error get all status'
            })
        }
    }
    static async commentStatus(req, res){
        const {pemainId, statusId, gambar, status} = req.body;
        const commentData = await new commentModel({
            pemainId, statusId, gambar, status
        })
        commentData.save()
        if(commentData){
            return res.status(200).json({message:'status send', data: commentData})
        }else{
            return res.status(200).json({message:'error send', data: commentData})
        }

    }
}

module.exports = Status;