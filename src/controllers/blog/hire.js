const hireModel = require('../../models/blog/hire/hire')

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
                res.status(400).json({message: 'message wrong'})
            }
        }catch{
            res.status(500).json({message: 'message erro 500'})
        }
    }
    static async getHireData(req, res){
        try{
            const data = await hireModel.find()
            console.log(data)
            if(data){
                res.status(200).json({message:'succes get data', data: data})
            }else{
                res.status(404).json({message: 'not found', data:data})
            }
        }catch{
            res.status(500).json({message: '500'})
        }
    }
}

module.exports = hireController