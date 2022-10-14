const navaModel = require('../models/navbar')

class Navbar {
    static async create(req, res) {
        const {
            namaMenu,
            subMenu,
            link,
            icon
        } = req.body;
        const insertNav = new navaModel({
            namaMenu,
            subMenu,
            link,
            icon
        })
        if(insertNav){
            res.status(200).json({message: 'success', data: insertNav})
        }else{
            res.status(400).json({message: 'error',}); 
        }
        return res.status(500).json({message: 'error'})

    }
    static async getNav(req, res){
      const getnav = await navaModel.find()
      if(!getnav) return res.status(404).json("invalid navigation")
      return res.status(200).json({message: 'success', data: getnav})
    }
}

module.exports = Navbar