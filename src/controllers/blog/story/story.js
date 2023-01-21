const storyModel = require('../../../models/blog/story/story')

class storyController {
    static async createStory(req, res){
        try{
            const {title, subTitle, content} = req.body
            const dataStory = await new storyModel({
                title, subTitle, content
            })
            dataStory.save()
            if(dataStory){
                res.status(200).json({message: 'succes', data: dataStory})
            }else{
                res.status(400).json({message: 'errr'})
            }
        }catch{
            res.status(500).json({message: '500'})
        }
    }
    static async getStory(req, res){
        try{
            const data = await storyModel.find()
            if(data){
                res.status(200).json({message:'success', data: data})
            }else{
                res.status(500).json({message:"404"})
            }
        }
        catch{
            res.status(500).json({message:'error'})
        }
    }
}

module.exports = storyController