const rolesmodel = require('../models/roles');

class RolesController {
    static async getRoles(req, res) {
        rolesmodel.find()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
    static addRole(req, res){
        const { name } = req.body;
        const newRole = new rolesmodel({
            name,
        });
        newRole.save()
        .then(response => {
            res.status(200).json({message:"success add role", data:response});
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
}

module.exports = RolesController;