const menuModel = require('../models/menu')

class MenuController {
    static async createMenu(req, res){
        const {
            state,
            name,
            typeMenu,
            icon,
        } = req.body;
        const namaMenu = menuModel.findOne(name);
        for(let i=0; i<namaMenu.length; i++){
            console.log(namaMenu[i].name != null)
        }
            if(namaMenu.name != name ){
                const menuData = new menuModel({
                    state,
                    name,
                    typeMenu,
                    icon,
                })
                menuData.save()
                .then((response) => {
                    res.status(200).send(response);
                })
                .catch((error) => {
                    res.status(error.code).send(error)
                })
            }else{
                res.status(402).send({message: 'nama menu sudah ada'})
            }
    }
}

module.exports = MenuController