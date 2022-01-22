const userModel = require('../models/user')

class UserController {
    static register(req, res){
        const { username, email, password, countInStock, alamat, numberphone} = req.body;
        const newUser = new userModel({
            username,
            email,
            password,
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
}