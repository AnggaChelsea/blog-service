const memberModel = require('../../models/blog/member')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifEmail = require('../../helper/emailVerifycation')

class memberController {
    static async register(req, res) {

        try {
            const {name, email, password, role} = req.body;
            const codeOtpConfirm = Math.floor(Math.random() * 1000000);
            const slic = codeOtpConfirm.toString().slice(0, 4);
            const emailExist = await memberModel.findOne({email})
            if (emailExist) {
                res.status(403).json({message: 'email has already axist'})
            } else {
                const data = await new memberModel({
                    name,
                    email,
                    codeOtp: slic,
                    password: bcrypt.hashSync(password, 10),
                    role
                })
                console.log(data)
                data.save()
                verifEmail(email, name, slic)
                if (data) {
                    console.log(data)
                    res.status(200).json({message: 'success register'})
                } else {
                    res.status(400).json({message: '400'})
                }
            }

        } catch {
            res.status(500).json(
                {message: '500'}
            )
        }}
    static async getMember(req, res) {
        try {
            const data = await memberModel.find()
            if (data) {
                return res.status(200).json({message: 'get data', data: data})
            }
        } catch {
            return res.status(500).json(
                {message: '500'}
            )
        }}

    static async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await memberModel.findOne({email});
            console.log(user, '1');
            if (user) {
                console.log(user, '2');
                if (user.verify === true) {
                    console.log(user.verify === true, '3');
                    if (bcrypt.compareSync(password, user.password)) {
                        console.log(bcrypt.compareSync(password, user.password), '4')
                        const token = jwt.sign({
                            userId: user.id,
                            name: user.name,
                            email: user.email,
                            userRole: user.role,
                            verified: user.verified,
                            typeUser: user.typeUser,
                            expiresIn: 43200000
                        }, "sayangmamah", {expiresIn: "12h"});
                        return res.status(200).json({
                            message: "success login",
                            id: user.id,
                            name: user.name,
                            role: user.role,
                            token
                        });
                    } else {
                        return res.status(400).json({message: "password or email wrong"});
                    }
                } else if (user.verify === false) {
                    console.log(user.verify === false, 'verif')
                    return res.status(400).json({code: 401, message: "please verify your email"});
                }
            } else {
                return res.status(400).json({message: "email not found"});
            }
        } catch {
            res.status(500).json(
                {message: '500'}
            )
        }}

    static async verifyOtp(req, res) {
        try {
            const {codeOtp} = req.body;
            const code = await memberModel.findOne({codeOtp: codeOtp});
            if (code !== null) {
                const findOtp = await memberModel.updateOne({
                    codeOtp: codeOtp
                }, {
                    $set: {
                        verify: true
                    }
                });
                res.status(200).json({message: "success verified", });
            } else {
                res.status(404).json({message: "code otp salah"});
            }
        } catch {
            res.status(500).json(
                {message: "error"}
            );
        }

}}module.exports = memberController;
