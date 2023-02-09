const memberModel = require('../../models/blog/member')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifEmailBlog = require('../../helper/blog/verif_aga_didevin')
const verifEmail = require('../../helper/emailVerifycation')
const errorHandler = require('../../helper/blog/errorhandler')
class memberController {
    static async register(req, res) {

        try {
            const {name, email, password, type} = req.body;
            const codeOtpConfirm = Math.floor(Math.random() * 1000000);
            const slic = codeOtpConfirm.toString().slice(0, 4);
            const emailExist = await memberModel.findOne({email})
            if (emailExist) {
                res.status(403).json({message: 'email has already axist'})
            } else {
                const data = await new memberModel({
                    type,
                    name,
                    email,
                    codeOtp: slic,
                    password: bcrypt.hashSync(password, 10),
                })
                console.log(data)
                data.save()
                const from = 'agadidevin2023@gmail.com';
                const to = email
                const subject = 'AGADIDEVIN CONFIRM EMAIL'
                const text = `hallo ${name} thanks, you already register number verif ${slic} please verify number to access your account  `
                // verifEmailBlog(from, to, subject, text)
                if (data) {
                    console.log(data)
                    res.status(200).json({message: `success register please check your email ${email}, code ${slic}`, code: slic})
                } else {
                    errorHandler(400)
                }
            }

        } catch {
            errorHandler(500)
        }}
    static async getMember(req, res) {
        try {
            const data = await memberModel.find()
            if (data) {
                return res.status(200).json({message: 'get data', data: data})
            }
        } catch {
            errorHandler(500, res.status)
        }}

    static async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await memberModel.findOne({email});
            const gnerateCode = Math.floor(Math.random() * 10000000000)
            if (user) {
                if (user.verify === true) {
                    if (bcrypt.compareSync(password, user.password)) {
                        console.log(user.type)
                        const datatoken = {
                            alg: 'HS256', 
                            typ: 'JWT',
                            userId: user.id,
                            name: user.name,
                            email: user.email,
                            userRole: user.type,
                            verified: user.verified,
                            typeUser: user.typeUser,
                            iat: Math.floor(Date.now() / 1000)
                        }
                        const token = jwt.sign({
                            alg: 'HS256', 
                            typ: 'JWT',
                            userId: user.id,
                            name: user.name,
                            email: user.email,
                            userRole: user.role,
                            verified: user.verified,
                            typeUser: user.typeUser,
                            iat: Math.floor(Date.now() / 1000)
                        }, "sayangmamah", {expiresIn: "12h"});
                        console.log("success login", datatoken)
                        return res.status(200).json({
                            message: "success login",
                            id: user.id,
                            name: user.name,
                            role: user.role,
                            token,
                            dataToken: datatoken
                        });
                    } else {
                        return errorHandler(400, res)
                    }
                } else if (user.verify === false) {
                    console.log(user.verify === false, 'verif')
                    errorHandler(400, res)
                }
            } else {
                errorHandler(400, res)
            }
        } catch {
            errorHandler(500, res)
        }}

    static async verifyOtp(req, res) {
        try {
            const {codeOtp} = req.body;
            const code = await memberModel.findOne({codeOtp: codeOtp});
            
            if (code !== null && code.verify !== true) {
                await memberModel.updateOne({
                        codeOtp: codeOtp
                    }, {
                        $set: {
                            verify: true
                        }
                    });
                    res.status(200).json({message: "success verified", });
                } else {
                    errorHandler(404, res)
                }
        } catch {
            errorHandler(500, res)
        }

}
}module.exports = memberController;
