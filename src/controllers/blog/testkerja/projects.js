const projectsModel = require('../../../models/testkerja/projects')

class ProjectController {
    static async createProject(req, res) {
        try{
            const {
                name,
                description,
                teacherName,
                rating,
                totalHours,
                typeStudent,
                image, 
                price,
                reviews
            } = req.body
    
            const dataProject = await new projectsModel({
                name,
                description,
                teacherName,
                rating,
                totalHours,
                typeStudent,
                image,
                price,
                reviews
            })
            dataProject.save()
            if (dataProject) {
                res.status(200).json({message: 'success', data: dataProject})
            } else {
                res.status(500).json({message: 'error', data: dataProject})
            }
        }catch{
            res.status(500).json({message: 'error 500'})
        }
    }
    static async getProject(req, res) { // disini harusnya typenya pos agar bisa buat asc desc filter
        try {
            const {asc, desc, rate, price} = req.body
            const dataProject = await projectsModel.findOne({
                asc: asc ? asc : 1,
                desc: desc ? desc : -1,
                rate: rate ? rate : '',
                price: price ? price : '',
                search: search ? search : ''
            })
            if (dataProject) {
                res.status(200).json({message: 'success',data: dataProject})
            } else {
                res.status(500).json({message: 'error', data: dataProject})
            }
        } catch {
            res.status(500).json(
                {message: 'error 500'}
            )
        }}

        static async getProjectAll(req, res) { // disini harusnya typenya pos agar bisa buat asc desc filter
            try {
                const dataProject = await projectsModel.find()
                if (dataProject) {
                    res.status(200).json({message: 'success', data: dataProject})
                } else {
                    res.status(500).json({message: 'error', data: dataProject})
                }
            } catch {
                res.status(500).json(
                    {message: 'error 500'}
                )
            }}

    static async getProjectDetail(req, res) {
        const dataProject = await projectsModel.findById(req.params.id)
        if (dataProject) {
            res.status(200).json({message: 'success', data: dataProject})
        } else {
            res.status(400).json({message: '400'})
        }
    }
    static async getDataPaginate(req, res){
        try{
                const dataProject = await projectsModel.find()
                const allData = dataProject.length
                const pageinate = 4;
                const page = parseInt(req.body.page) || 1;
                const hargaTinggi = req.body.hargaTinggi ? req.body.hargaTinggi : null;
                const hargaRendah = req.body.hargaRendah ? req.body.hargaRendah : null;
                if(hargaTinggi != null){
                    const dataFilter = await projectsModel.find({
                        price: {$gt: hargaTinggi}
                    })
                    const startIndex = (page - 1) * pageinate;
                    const endIndex = startIndex + pageinate;
                    const result = dataFilter.slice(startIndex, endIndex)
                    res.status(200).json({
                        currentPage: page,
                        lengthproject: result.length,
                        page: page,
                        pages: Math.ceil(result.length / pageinate),
                        data: result,
                        pagesAll: allData,
                    });
                }else if(hargaRendah != null){
                    const dataFilter = await projectsModel.find({
                        price: {$lt: hargaRendah}
                    })
                    const startIndex = (page - 1) * pageinate;
                    const endIndex = startIndex + pageinate;
                    const result = dataFilter.slice(startIndex, endIndex)
                    res.status(200).json({
                        currentPage: page,
                        lengthproject: result.length,
                        page: page,
                        pages: Math.ceil(result.length / pageinate),
                        data: result,
                        pagesAll: allData,
                    });
                }else{
                    const startIndex = (page - 1) * pageinate;
                    const endIndex = startIndex + pageinate;
                    const result = dataProject.slice(startIndex, endIndex)
                    res.status(200).json({
                        currentPage: page,
                        lengthproject: result.length,
                        page: page,
                        pages: Math.ceil(result.length / pageinate),
                        data: result,
                        pagesAll: allData,
                    });
                }
        }catch{
          return  res.status(500).json({message: 'error'})
        }
    }
}

module.exports = ProjectController;
