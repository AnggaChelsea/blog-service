const statusModel = require('../../models/pemain/status')

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
}

module.exports = Status;