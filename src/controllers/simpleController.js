const simpleModel = require('../models/simplelogin')
const jwt = require("jsonwebtoken");


class SimpleLoginController {
    static async signup(req, res){
        const { email, password } = req.body;
        const user = new simpleModel({ email, password })
        if(!user) return res.status(404).json("invalid-logins");
        const token = jwt.sign({
            userId: user.id,
            userRole: user.role,
          },
          "sayangmamah", {
            expiresIn: "1h",
          }
        );
        res.status(200).json({message:'success', token: token});
    }

    static async login(req, res){
        const { email, password} = req.body;
        const findUser = simpleModel.findOne({email: email});
        if(findUser === null) return res.status(404).json("invalid email, passwordSchema    not found");
        const token = jwt.sign({ email : email, password : password }, "sayangmamah", { expiresIn: "1h" });
        res.status(200).json({message:'success', token: token});
        
    }
}

module.exports = SimpleLoginController