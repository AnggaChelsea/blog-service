const workModel = require('../../models/blog/work')

class workController {
    static async createWork(req, res){
        try{
            const { name, imageLink, description } = req.body;
            const data = await new workModel({
                name, imageLink, description
            });
            data.save()
            if(data){
                res.status(200).json({message: 'success', data: data})
            }else{
                res.status(400).json({message: '400'})
            }
        }catch{
            res.status(500).json({message: '500'})
        }
    }
    static async getWork(req, res){
        try{ const data = await workModel.find()
            if(data){
                res.status(200).json({message:'success', data: data})
            }else{
                res.status(500).json({message: '500'})
            }}
        catch{
            res.status(500).json({message: '500'})
        }
       
    }
}
module.exports = workController