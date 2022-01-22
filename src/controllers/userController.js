const userModel = require('../models/user')

const bcrypt = require('bcryptjs');
class UserController {
    static async register(req, res){
        const { name, email, password, countInStock, alamat, numberphone} = req.body;
        const newUser = new userModel({
            name,
            email,
            password:bcrypt.hashSync(password, 10),
            countInStock, 
            alamat, 
            numberphone,
        });
        newUser.save()
        .then(response => {
            res.status(200).json({message:"success add user", data:response});
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
    static getUser(req, res) {
        userModel.find().select('-password')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
    static loginUser(req, res) {
        const { email, password } = req.body;
        userModel.findOne({ email })
        .then(response => {
            if(response){
                if(bcrypt.compareSync(password, response.password)){
                    res.status(200).json(response);
                }else{
                    res.status(400).json({message:"password salah"});
                }
            }else{
                res.status(400).json({message:"email tidak terdaftar"});
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
    
}

module.exports = UserController;