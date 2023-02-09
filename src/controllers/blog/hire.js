const hireModel = require('../../models/blog/hire/hire')
const errorHandler = require('../../helper/blog/errorhandler')

class hireController {
    static async createHire(req, res){
        try{
            const { email, numberPhone, companyName, message } = req.body;
            const hireData = await new hireModel({
                companyName, message,email, numberPhone,
            })
            console.log(hireData)
            hireData.save();
            if(hireData){
                res.status(200).json({message: 'message sended'})
            }else{
                errorHandler(400, res)
            }
        }catch{
            errorHandler(500, res)
        }
    }
    static async getHireData(req, res){
        try{
            const data = await hireModel.find()
            console.log(data)
            if(data){
                res.status(200).json({message:'succes get data', data: data})
            }else{
                errorHandler(400, res)
            }
        }catch{
            errorHandler(500, res)
        }
    }
    static async deleteHire(req, res){
        try{
            const {id} = req.params
            const data = await hireModel.findByIdAndDelete(id)
            if(data){
                res.status(200).json({message: 'success delete', data: data})
            }else{
                errorHandler(400, res)
            }
        }catch{
            errorHandler(500, res)
        }
    }
}

module.exports = hireController