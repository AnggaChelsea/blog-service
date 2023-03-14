const userModel = require("../models/users/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const lapangModel = require("../models/lapang/lapang");
const sendVeryficationEmail = require("../helper/emailVerifycation");
const smsVerify = require("../helper/smsverif");
const sendVeryficationPassword = require("../helper/passwordVerification");
const nodemailer = require("../config/nodemailer");
const sha256 = require("crypto-js/sha256");
var crypto = require("crypto");
const messagebird = require("messagebird")(`${
    process.env.MESSAGEBIRD_API_KEY
}`);
const dotenv = require("dotenv");
dotenv.config();
const navbarM = require("../models/navbar");

// console.log(process.env.URL_HOST);
const {find} = require("../models/users/user");
var kode = null;
class UserController {
    static async createNav(req, res) {
        const {namelabel, link, typeLilnk} = req.body;
        const newNav = new navbarM({namelabel, link, typeLilnk})
        newNav.save().then((resp) => {
            return res.status(200).json({message: "success", data: resp});
        }).catch((err) => {
            return res.status(500).json({message: "failed", data: resp});
        });
    }

    static async updateUser(req, res) {
        const filename = req.file;
        const nameFileImage = Math.round(Math.random() * 100000) + filename;
        const {
            name,
            email,
            password,
            image,
            alamat,
            numberphone,
            beratBadan,
            jenisKelamin,
            tinggiBadan
        } = req.body;
        const user = await userModel.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password,
            image,
            alamat,
            numberphone,
            beratBadan,
            tinggiBadan,
            jenisKelamin,
            tanggalLahir
        }, {new: true});
        if (user) {
            res.status(200).json({message: "User updated successfully", user});
        } else {
            res.status(404).json({message: "User not found"});
        }
    }

    static async follow(req, res) {
        const followers = req.body;
        const findDuluUser = await userModel.findByIdAndUpdate(req.params.id, {
            $push: {
                followers: followers
            }
        }, {new: true});
        if (! findDuluUser) {
            res.status(404).json({status: 404, message: "Product not found"});
        }
        findDuluUser.save();
        res.status(200).json(findDuluUser);
    }

    static async sendPesan(req, res) {
        const {
            sellerId, // sellerid yang nerima pesan / yang punya barang
            message,
            file,
            buyerId, // sender id ini yang diisi oleh user untuk tanya
            productId, // product yang di pesan
        } = req.body;
        const date = new Date();
        const sendTerima = await userModel.findByIdAndUpdate(sellerId, {
            $push: {
                pesanTerima: [
                    {
                        buyerId,
                        createdAt: date
                    },
                ]
            }
        }, {new: true});
        const sendTerkirim = await userModel.findByIdAndUpdate(buyerId, {
            $push: {
                pesanKirim: [
                    {
                        buyerId,
                        createdAt: date
                    },
                ]
            }
        }, {new: true});
        if (sendTerima && sendTerkirim) {
            const pesan = await new messageModel({
                sellerId,
                message,
                file,
                buyerId,
                productId,
                createdAt
            });
            pesan.save();
            return res.status(200).json({pesan, message: "pesan dikirim"});
        } else {
            return res.status(404).json({message: "pesan gagal dikirim"});
        }
    }

    static async findPesan(req, res) {
        const pesanSenderId = req.params.id;
        const findpesanFromUser = await userModel.find().populate("pesan", {senderId: pesanSenderId}).populate("pesan.productId", "name");
        if (findpesanFromUser) {
            res.status(200).json({findpesanFromUser, message: "pesan ditemukan"});
        } else {
            res.status(404).json({message: "pesan not found"});
        }
    }

    static async sendpesan(req, res) {
        const userparams = req.params.id;
        const {senderId, message, file, productId} = req.body;
        const findUserToChat = await userModel.findByIdAndUpdate(userparams, {
            $push: {
                pesanmasuk: [
                    {
                        senderId,
                        message,
                        file,
                        productId
                    },
                ]
            }
        }, {new: true});
        if (findUserToChat) {
            await userModel.findOneAndUpdate(senderId, {
                $push: {
                    pesanterkirim: [
                        {
                            kirimke: userparams,
                            file: findUserToChat.file,
                            message: findUserToChat.mesage,
                            productId: findUserToChat.productId
                        },
                    ]
                }
            });
            const masukpesan = await messageModel.find(senderId);
            if (masukpesan.senderId != null) {
                const insertPesan = await new messageModel({
                    productId: findUserToChat.productId,
                    message: findUserToChat.message,
                    file: findUserToChat.file,
                    senderId: findUserToChat.senderId,
                    buyerId: findUserToChat.buyerId
                });
            } else {
                await messageModel.findOneAndUpdate({
                    senderId: senderId,
                    productId: findUserToChat.productId
                }, {
                    $push: {
                        message: findUserToChat.message,
                        file: findUserToChat.file,
                        senderId: findUserToChat.senderId,
                        buyerId: findUserToChat.buyerId
                    }
                }, {new: true});
            }
            res.status(200).json({message: "pesan berhasil dikirim", findUserToChat});
        } else {
            res.status(404).json({message: "pesan gagal dikirim"});
        }
    }

    static async registerGoogle(req, res) { // register by google
        const tokenGoogle = req.body;
    }

    static async registerNew(req, res) {
        const codeOtpConfirm = Math.floor(Math.random() * 1000000);
        const toString = codeOtpConfirm.toString();
        const slic = toString.split(0, 4);
        const {
            name,
            email,
            password,
            alamat,
            image,
            numberphone,
            coordinateLocation
        } = req.body;

        if (name || email || password || numberphone || alamat || image == "") {
            res.status(400).json({message: "wajib isi data"});
        }

        const usernew = await new userModel({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            image,
            alamat,
            numberphone,
            codeOtp: slic,
            coordinateLocation
        });
        if (! usernew) {
            res.status(500).json(err);
        } else {
            usernew.save();
            sendVeryficationEmail(email, name, slic);
            res.status(200).json({message: "success register"});
        }
    }

    static async logins(req, res) {
        const {password, email} = req.body;
        console.log(email)
        const user = await userModel.findOne({email: email});
        console.log(user)
        if (user) {
            if (user.verified === true) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({
                        userId: user.id,
                        name: user.name,
                        email: user.email,
                        userRole: user.role,
                        verified: user.verified,
                        typeUser: user.typeUser,
                        expiresIn: '1m'
                    }, "sayangmamah", {expiresIn: "1m"});
                    return res.status(200).json({
                        message: "success login",
                        id: user.id,
                        name: user.name,
                        pesan: user.pesan,
                        typeUser: user.typeUser,
                        token
                    });
                } else {
                    res.status(400).json({message: "password or email wrong"});
                }
            } else if (user.verified === false) {
                res.status(400).json({code: 401, message: "please verify your email"});
            }
        } else {
            res.status(400).json({message: "email not found"});
        }
    }

    static async checkEmail(req, res) {
        const {email} = req.body;
        const otpPassword = Math.floor(Math.random() * 1000000);
        const findEmail = await userModel.findOneAndUpdate(email, {
            codeOtp: otpPassword
        }, {new: true});
        if (findEmail) {
            const from = "adeadeaja2121@gmail.com";
            const linkto = `code verifikasi anda ${otpPassword}`;
            sendVeryficationPassword(from, email, linkto);
            return res.status(200).json({success: true, name: findEmail.name, message: `verifikasi password terkirim ke email ${email}`});
        } else {
            return res.status(404).json({message: "email not found"});
        }
    }

    static async checkCodeOtpPassword(req, res) {
        const codeOtp = req.body.codeOtp;
        const findCode = await userModel.findOne({codeOtp});
        if (findCode) {
            return res.status(200).json({success: true, message: "success"});
        }
        return res.status(404).json({message: "code otp not found"});
    }

    static async verifyOtp(req, res) {
        try {
            const {codeOtp} = req.body;
            const code = await userModel.findOne({codeOtp: codeOtp});
            if (code !== null) {
                const findOtp = await userModel.updateOne({
                    codeOtp: codeOtp
                }, {
                    $set: {
                        verified: true
                    }
                });
                return res.status(200).json({message: "success", data: findOtp});
            } else {
                return res.status(400).json({message: 'wrong code'})
            }
        } catch {
            return res.status(500).json(
                {message: "error"}
            );
        }


}

static async message(req, res) {
    const {message, uploadfile} = req.body;
    const userId = req.params.id;

    let userid = await userModel.findOne({id: userId}).then((user) => {
        const newChat = new ChatRooms({message, uploadfile});
        newChat.save().then((response) => {
            res.status(200).json({response, user: userid, message: "success sended"});
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
    let messageC = await new messageModel({message, uploadfile});
    messageC.save().then((response) => {
        res.status(200).json({response, user: userid, message: "success add chat"});
    }).catch((err) => {
        res.status(500).json(err);
    });
}

static async verifyEmail(req, res) {
    const userId = req.params.id;
    const userFind = await userModel.findByIdAndUpdate(userId, {verified: true});
    res.status(200).json({message: "success verify", userFind});
}

static async changPasswordUser(req, res) {
    const userId = req.params;
    const {password} = req.body;
    const findEmail = await userModel.findOneAndUpdate(userId, {
        password: bcrypt.hashSync(password, 10)
    }, {new: true});
    if (findEmail) {
        res.status(200).json({message: "success change password"});
    } else {
        res.status(404).json({message: "email or password wrong"});
    }
}

static async forgotPassword(req, res) {
    const {email} = req.body;
    const userId = req.params.id;
    const user = await userModel.findOne({email});
    if (user && userId === user.id) {
        const secret = process.env.SCRET_KEY;
        const token = jwt.sign({
            userId: user.id
        }, secret, {expiresIn: "1m"});
        const emails = user.email;
        const name = user.name;
        const code = Math.floor(Math.random() * 1000000);
        const link = `${
            process.env.API_URL
        }/user/verify?token=${token}&code=${code}`;

        const mailOptions = {
            from: "adeadeaja2121@gmail.com",
            to: emails,
            subject: "Verify your email",
            html: `<h1>Hello ${name}</h1>
        <p>Please click the link to verify your email</p>
        <a href=${link}>${link}</a>`
        };
        nodemailer.sendMail(mailOptions, (err, info) => {
            if (err) {} else {}
        });
        res.status(200).json({message: "success send email", code});
    } else {
        res.status(400).json({message: "email not found"});
    }
}

static async follow(req, res) {
    const userId = req.params.id;
    const {userFollow} = req.body;
    const findUserDulu = await userModel.findByIdAndUpdate(userId, {
        $push: {
            followers: userId
        }
    }, {new: true});
    if (findUserDulu) {
        res.status(200).json({message: "success follow"});
    } else {
        res.status(500).json({message: "failed follow"});
    }
}

static async getFollowers(req, res) {
    const userId = req.params.id;
    const findUser = await userModel.findById(userId).populate("followers");
    if (findUser) {
        res.status(200).json({message: "success get followers", findUser});
    } else {
        res.status(500).json({message: "failed get followers"});
    }
}

static async changePassword(req, res) {
    const {newpassword} = req.body;
    const user = await userModel.findByIdAndUpdate(req.params.id, {
        password: newpassword
    }, {new: true});
    if (user) {
        user.save().then((user) => {
            res.status(200).json({message: "success change password", user});
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
}

static async getAllUser(req, res) {
    const user = await userModel.find()
    if (user) {
        res.status(200).json({message: "success get all user", data: user});
    } else {
        res.status(400).json({message: "user not found"});
    }
}
static async getUserById(req, res) {
    const user = await userModel.findOne({id: req.params.id});
    if (! user) {
        res.status(400).json({message: "user not found"});
    }
    res.status(200).json({message: "success get user by id", data: user});
}

static async getAllProducts(req, res, next) {
    const product = await allProduct.find().populate("category");
    if (! product) {
        await res.status(404).json({status: 404, message: "Products not found"});
        return;
    } else {
        res.status(200).json({message: "success", data: productgetProductbyCategory});
    }
}

static cariLapangTerdekat(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
        dist = dist * 1.609344;
    }
    if (unit == "N") {
        dist = dist * 0.8684;
    }
    return dist;
}

static async getLocationNearbe(req, res) {
    try {
        const {latitude, longitude} = req.body;
        const dataGet = await lapangModel.aggregate([{
                $geoNear: {
                    near: {
                        type: 'Point',
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude)
                    },
                    key: 'location',
                    maxDistance: parseFloat(1000) * 1609,
                    distanceField: 'dist.calculated',
                    spherical: true
                }
            },]);
        res.status(200).send({message: 'Location find', data: dataGet});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}}module.exports = UserController;
