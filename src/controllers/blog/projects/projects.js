const projectModel = require('../../../models/blog/projects/projects');

class ProjectController {
    static async createProject(req, res) {
        const {name, description, imageLink} = req.body;
        console.log(name, description, imageLink);
        try {
            const project = await new projectModel({name, description, imageLink}).save();
            console.log(project.name, project.description, project.imageLink);
            res.send('Blog created!')
        } catch {
            res.status(500).json(
                {message: 'error 500'}
            )
        }}

        static async getData(req, res){
            try{
                const dataProject = await projectModel.find()
                res.status(200).json({message: dataProject})
            }catch{
                res.status(500).json({message: 'error'})
            }
        }
        static async deleteProject(req, res){
            try{
                const id = req.params
                const data = await projectModel.findOneAndDelete(id)
                if(data){
                    res.status(200).json({message:'succes delete'})
                }
            }catch{
                res.status(500).json({message: 'error 500'})
            }
        }
        static async edit(req, res){
            try{
                const {id} = req.params; 
                console.log(id)
                const {name, description, imageLink} = req.body;
                const project = await projectModel.findByIdAndUpdate(id, {
                    name,
                    description,
                    imageLink,
                }, {
                    new: true
                })
                console.log(project, 'project')
              if(project){
                res.status(200).json({message: 'project updated'})
              }
            }catch{
                res.status(500).json({message: 'error 500'})
            }
        }
        static async getDetail(req, res){
            try{
                const {id} = req.params
                console.log(id)
                const data = await projectModel.findById(id)
                console.log(data)
                if(data){
                    res.status(200).send({message: 'success', data: data})
                }
            }catch{
                res.status(500).json({message: 'error',})
            }
            

        }
}

module.exports = ProjectController
