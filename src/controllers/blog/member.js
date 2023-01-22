const memberModel = require('../../models/blog/member')

class memberController {
    static async register(req, res){
        try{
            const { name, email, password, role } = req.body
            // const dataemail = await memberModel.findOne(email)
            // if(dataemail){
            //    return false
            // }
            const data = await new memberModel({
                name, email, password, role
            })
            data.save()
            if(data)
            res.status(200).json({message: 'success register'})
             
        }catch{
            res.status(500).json({message: '500'})
        }
    }
    static async getMember(req, res){
        try{
            const data = await memberModel.find()
            if(data){
                return res.status(200).json({message:'get data', data:data})
            }
        }catch{
            return res.status(500).json({message:'500'})
        }
    }
}

module.exports = memberController;