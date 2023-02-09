const projectModel = require('../../../models/blog/projects/projects');

class ProjectController {
    static async createProject(req, res) {
        const {name, description, imageLink, linkVideo, status} = req.body;
        try {
            const project = await new projectModel({name, imageLink, linkVideo, description, status}).save();
            if(project){
                res.status(200).json({message:'success', data:project});
            }
        } catch {
            res.status(500).json(
                {message: 'error 500'}
            )
        }}

        static async getData(req, res){
            try{
                    const dataProject = await projectModel.find()
                    const allData = dataProject.length
                    console.log(allData, 'lengt')
                    const pageinate = 7;
                    const page = parseInt(req.body.page) || 1;
                    const startIndex = (page - 1) * pageinate;
                    console.log(startIndex, 'start')
                    const endIndex = startIndex + pageinate;
                    console.log(endIndex, 'end')
                    const result = dataProject.slice(startIndex, endIndex)
                    res.status(200).json({
                        currentPage: page,
                        lengthproject: result.length,
                        page: page,
                        pages: Math.ceil(result.length / pageinate),
                        data: result,
                        pagesAll: allData,
                    });
                    // console.log(datares, 'datares')
               
            }catch{
              return  res.status(500).json({message: 'error'})
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
               
                const {name, imageLink, linkVideo, description} = req.body;
                const project = await projectModel.findByIdAndUpdate(id, {
                    name, imageLink, linkVideo, description
                }, {
                    new: true
                })
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
                const data = await projectModel.findById(id)
                if(data){
                    res.status(200).send({message: 'success', data: data})
                }else{
                    res.status(400).json({message: 'error'});
                    
                }
            }catch{
                res.status(500).json({message: 'error',})
            }
            

        }
}

module.exports = ProjectController
