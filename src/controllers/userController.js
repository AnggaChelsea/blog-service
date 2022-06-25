const userModel = require("../models/user");
const messageModel = require("../models/message");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendVeryficationEmail = require("../helper/emailVerifycation");
const sendVeryficationPassword = require("../helper/passwordVerification");
const nodemailer = require("../config/nodemailer");
const allProduct = require("../models/allproducts");
const sha256 = require("crypto-js/sha256");
var crypto = require('crypto');
const messagebird = require('messagebird')(`${process.env.MESSAGEBIRD_API_KEY}`);
const dotenv = require("dotenv");
dotenv.config();
const passwordSchema = require('../models/codePassword');

console.log(process.env.URL_HOST);
const {
  find
} = require("../models/user");
const productModel = require("../models/product");
var kode = null;
class UserController {


  static async regisByPhone(req, res) {
    const code = Math.round(Math.random() * 100000);
    const {
      name,
      phone,
      email,
      password
    } = req.body;
    const user = await new userModel({
      name,
      phone,
    });
    if (user) {
      return res.status(200).send({
        message: "user berhasil registrasi",
        user,
      });
    }
  }

  static async updateUser(req, res) {
    const filename = req.file
    const nameFileImage = Math.round(Math.random() * 100000) + filename
    const {
      name,
      email,
      password,
      image,
      alamat,
      numberphone
    } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.params.id, {
        name,
        email,
        password,
        image: nameFileImage,
        alamat,
        numberphone,
      }, {
        new: true,
      }
    );
    if (user) {
      res.status(200).json({
        message: "User updated successfully",
        user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  }

  static async followeUser(req, res) {
    const followers = req.body;
    const user = await userModel.findById(req.params.id);
    if (user) {
      const newFollow = await new userModel({
        followers,
      });
      newFollow
        .save()
        .then((response) => {
          return res.status(200).json({
            response,
            user: userid,
            message: "followers bertambah",
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  }

  static async getChatByBuyer(req, res) {
    const {
      buyerId,
      sellerId
    } = req.body;
    const chat = await messageModel
      .find({
        buyerId,
        sellerId,
      })
      .populate("buyerId", "name")
      .populate("sellerId", "name");
    if (chat) {
      return res.status(200).json({
        chat,
        message: "chat ditemukan",
      });
    }
    return res.status(400).json({
      message: "chat not found",
    });
    // if(chat.buyerId === buyerId && chat.sellerId === sellerId){
    //   res.status(200).json({
    //     chat
    //   })
    // }else{
    //   res.status(404).json({
    //     message: 'chat not found'
    //   })
    // }
  }

  static async follow(req, res) {
    const followers = req.body;
    const findDuluUser = await userModel.findByIdAndUpdate(
      req.params.id, {
        $push: {
          followers: followers,
        },
      }, {
        new: true,
      }
    );
    if (!findDuluUser) {
      res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }
    findDuluUser.save();
    res.status(200).json(findDuluUser);
  }


  static async sendPesan(req, res) {
    ;
    const {
      sellerId, // sellerid yang nerima pesan / yang punya barang
      message,
      file,
      buyerId, //sender id ini yang diisi oleh user untuk tanya
      productId, //product yang di pesan
    } = req.body;
    const date = new Date();
    const sendTerima = await userModel.findByIdAndUpdate(sellerId, {
      $push: {
        pesanTerima: [{
          buyerId,
          createdAt: date,
        }],
      },
    }, {
      new: true,
    });
    const sendTerkirim = await userModel.findByIdAndUpdate(buyerId, {
      $push: {
        pesanKirim: [{
          buyerId,
          createdAt: date,
        }]
      }
    }, {
      new: true,
    })
    if (sendTerima && sendTerkirim) {
      const pesan = await new messageModel({
        sellerId,
        message,
        file,
        buyerId,
        productId,
        createdAt,
      });
      pesan.save();
      return res.status(200).json({
        pesan,
        message: "pesan dikirim",
      });
    } else {
      return res.status(404).json({
        message: "pesan gagal dikirim",
      });
    }
  }

  static async findPesan(req, res) {
    const pesanSenderId = req.params.id;
    const findpesanFromUser = await userModel
      .find()
      .populate("pesan", {
        senderId: pesanSenderId,
      })
      .populate("pesan.productId", "name");
    if (findpesanFromUser) {
      res.status(200).json({
        findpesanFromUser,
        message: "pesan ditemukan",
      });
    } else {
      res.status(404).json({
        message: "pesan not found",
      });
    }
  }

  static async sendpesan(req, res) {
    const userparams = req.params.id;
    const {
      senderId,
      message,
      file,
      productId
    } = req.body;
    const findUserToChat = await userModel.findByIdAndUpdate(
      userparams, {
        $push: {
          pesanmasuk: [{
            senderId,
            message,
            file,
            productId,
          }]
        },
      }, {
        new: true,
      }
    );
    if (findUserToChat) {
      await userModel.findOneAndUpdate(
        senderId, {
          $push: {
            pesanterkirim: [{
              kirimke: userparams,
              file: findUserToChat.file,
              message: findUserToChat.mesage,
              productId: findUserToChat.productId
            }]
          }
        }
      )
      const masukpesan = await messageModel.find(senderId);
      if (masukpesan.senderId != null) {
        const insertPesan = await new messageModel({
          productId: findUserToChat.productId,
          message: findUserToChat.message,
          file: findUserToChat.file,
          senderId: findUserToChat.senderId,
          buyerId: findUserToChat.buyerId,
        })
      } else {
        await messageModel.findOneAndUpdate({
          senderId: senderId,
          productId: findUserToChat.productId,
        }, {
          $push: {
            message: findUserToChat.message,
            file: findUserToChat.file,
            senderId: findUserToChat.senderId,
            buyerId: findUserToChat.buyerId,
          },
        }, {
          new: true,
        })
      }
      res.status(200).json({
        message: "pesan berhasil dikirim",
        findUserToChat,
      });

    } else {
      res.status(404).json({
        message: "pesan gagal dikirim",
      });
    }
  }

  static async getPesan(req, res) {
    const userId = req.params.userId
    const findUser = await userModel.findById(userId)
    if (findUser != null) {
      res.response(200).json({
        message: 'success'
      })
    } else {
      res.response(404).json({
        message: 'kosong'
      })
    }
  }

  static async register(req, res) {
    const {
      name,
      email,
      password,
      image,
      alamat,
      numberphone
    } = req.body;
    const newUser = await new userModel({
      name,
      email,
      password,
      image,
      alamat,
      numberphone,
    });
    const emailUser = usernew.email;
    const from = "adeadeaja2121@gmail.com";
    const userId = usernew.id;
    const host = "http://localhost:8001";
    const linkConfirm = `mohon klik link ini untuk verifikasi akunmu ${host}/user/verify/${userId}`;
    let message = {
      from: from,
      to: emailUser,
      subject: "AMP4EMAIL message",
      text: "OLX COMMERCE",
      html: `<p>Terimakasih click link ini untuk verifikasi ${linkConfirm}</p>`,
      amp: `<!doctype html>
          <html ⚡4email>
            <head>
              <meta charset="utf-8">
              <style amp4email-boilerplate>body{visibility:hidden}</style>
              <script async src="https://cdn.ampproject.org/v0.js"></script>
              <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
            </head>
            <body>
              <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
              <p>GIF (requires "amp-anim" script in header):<br/>
                <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
            </body>
          </html>`,
    };
    nodemailer.sendMail(message, (err, info) => {
      if (err) {
        res.status(500).json(err);
      } else {
        usernew.save().then((response) => {
          sendVeryficationEmail(from, emailUser, linkConfirm);
          return res.status(200).json({
            message: "success register",
            response,
          });
        });
      }
    });
  }

  static async registerGoogle(req, res) {
    //register by google
    const tokenGoogle = req.body;
  }

  static async registerByPhone(req, res) {
    const phoneNumber = req.body;
    const code = Math.floor(Math.random() * 10000)
    // Make request to Verify API
    messagebird.verify.create(number, {
      originator: 'Code',
      template: `ini kode konfirmasinya ${code}`
    }, function (err, response) {
      if (err) {
        // Request has failed
        console.log(err);
        res.response(500).json({
          message: 'error'
        });
      } else {
        // Request was successful
        console.log(response);
        res.response(200).json({
          message: 'success'
        });
      }
    })
  }

  static async getPesan(req, res) {
    const userId = req.params.id;
    const findPesan = await userModel.findById(userId).populate("pesan", {
      senderId: userId,
    });
    if (findPesan) {
      res.status(200).json({
        findPesan,
        message: "pesan ditemukan",
      });
    } else {
      res.status(404).json({
        message: "pesan not found",
      });
    }
  }

  static async Chatting(req, res) {
    const userId = req.params.id;
    const findPesan = await userModel.findById(userId).populate("pesan", {
      senderId: userId,
    });
    if (findPesan) {
      res.status(200).json({
        findPesan,
        message: "pesan ditemukan",
      });
    } else {
      res.status(404).json({
        message: "pesan not found",
      });
    }
  }

  static async registerNew(req, res) {
    const codeOtpConfirm = Math.floor(Math.random() * 1000000);
    const imagePhoto = req.file;
    const namingFile = `Math.floor(Math.random() * 1000000) "-" ${imagePhoto}`;
    const {
      name,
      email,
      password,
      alamat,
      numberphone,
      coordinateLocation,
    } = req.body;
    // const salt = crypto.randomBytes(1664).toString("hex");
    // const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    const imageUrl = `${process.env.LOCAL_HOST}${process.env.URL_HOST}${process.env.PATH_PROFILE}`;
    const findUser = (user) => user.email === email;
    const usernew = await new userModel({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      image: namingFile,
      alamat,
      numberphone,
      codeOtp: codeOtpConfirm,
      coordinateLocation,
    });
    const emailUser = usernew.email;
    const from = "freelacerw9@gmail.com";
    const linkConfirm = `mohon masukan code otp ${codeOtpConfirm} ini untuk verifikasi akunmu `;

    if (!usernew) {
      res.status(500).json(err);
    } else {
      usernew.save().then((response) => {
        sendVeryficationEmail(from, name, emailUser, linkConfirm);
        res.status(200).json({
          message: "success register",
        });
      });
    }
  }

  static async logins(req, res) {
    const {
      password,
      email
    } = req.body;
    const user = await userModel.findOne({
      email,
    });
    if (user) {
      if (user.verified === true) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({
              userId: user.id,
              userRole: user.role,
            },
            "sayangmamah", {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "success login",
            id: user.id,
            name: user.name,
            pesan: user.pesan,
            token,
          });
        } else {
          res.status(400).json({
            message: "password or email wrong",
          });
        }
      } else if (user.verified === false) {
        res.status(400).json({
          code: 401,
          message: "please verify your email",
        });
      }
    } else {
      res.status(400).json({
        message: "email not found",
      });
    }
  }

  static async checkEmail(req, res) {
    const {
      email
    } = req.body;
    const otpPassword = Math.floor(Math.random() * 1000000);
    const findEmail = await userModel.findOneAndUpdate(email, {
      codeOtp: otpPassword,
    }, {
      new: true,
    });
    if (findEmail) {
      const from = "adeadeaja2121@gmail.com";
      const linkto = `code verifikasi anda ${otpPassword}`
      sendVeryficationPassword(from, email, linkto);
      return res.status(200).json({
        success: true,
        name: findEmail.name,
        message: `verifikasi password terkirim ke email ${email}`,
      });
    } else {
      return res.status(404).json({
        message: "email not found",
      });
    }
  }

  static async checkCodeOtpPassword(req, res) {
    const codeOtp = req.body.codeOtp;
    const findCode = await userModel.findOne({
      codeOtp,
    });
    if (findCode) {
      return res.status(200).json({
        success: true,
        message: "success",
      });
    }
    return res.status(404).json({
      message: "code otp not found",
    });
  }

  static async verifyOtp(req, res) {
    const {
      codeOtp
    } = req.body;
    const findOtp = await userModel.findOneAndUpdate({
      codeOtp: codeOtp,
    }, {
      $set: {
        verified: true,
      },
    }, {
      new: true,
    });
    if (findOtp) {
      res.status(200).json({
        message: "success verify otp",
      });
      await userModel.findOneAndUpdate({
        $set: {
          codeOtp: 0
        },
      });
    } else {
      res.status(500).json({
        message: "failed verify otp",
      });
    }
  }

  static async message(req, res) {
    const {
      message,
      uploadfile
    } = req.body;
    const userId = req.params.id;

    let userid = await userModel
      .findOne({
        id: userId,
      })
      .then((user) => {
        const newChat = new ChatRooms({
          message,
          uploadfile,
        });
        newChat
          .save()
          .then((response) => {
            res.status(200).json({
              response,
              user: userid,
              message: "success sended",
            });
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });
    let messageC = await new messageModel({
      message,
      uploadfile,
    });
    messageC
      .save()
      .then((response) => {
        res.status(200).json({
          response,
          user: userid,
          message: "success add chat",
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async verifyEmail(req, res) {
    const userId = req.params.id;
    const userFind = await userModel.findByIdAndUpdate(userId, {
      verified: true,
    });
    res.status(200).json({
      message: "success verify",
      userFind,
    });
  }

  static async changPasswordUser(req, res) {
    const userId = req.params;
    const {
      password
    } = req.body;
    const findEmail = await userModel.findOneAndUpdate(
      userId, {
        password: bcrypt.hashSync(password, 10),
      }, {
        new: true,
      }
    );
    if (findEmail) {
      res.status(200).json({
        message: "success change password",
      });
    } else {
      res.status(404).json({
        message: "email or password wrong",
      });
    }
  }



  static async forgotPassword(req, res) {
    const {
      email
    } = req.body;
    const userId = req.params.id;
    const user = await userModel.findOne({
      email,
    });
    if (user && userId === user.id) {
      const secret = process.env.SCRET_KEY;
      const token = jwt.sign({
          userId: user.id,
        },
        secret, {
          expiresIn: "1h",
        }
      );
      const emails = user.email;
      const name = user.name;
      const code = Math.floor(Math.random() * 1000000);
      const link = `${process.env.API_URL}/user/verify?token=${token}&code=${code}`;

      const mailOptions = {
        from: "adeadeaja2121@gmail.com",
        to: emails,
        subject: "Verify your email",
        html: `<h1>Hello ${name}</h1>
        <p>Please click the link to verify your email</p>
        <a href=${link}>${link}</a>`,
      };
      nodemailer.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
      res.status(200).json({
        message: "success send email",
        code,
      });
    } else {
      res.status(400).json({
        message: "email not found",
      });
    }
  }

  static async follow(req, res) {
    const userId = req.params.id;
    const {
      userFollow
    } = req.body;
    const findUserDulu = await userModel.findByIdAndUpdate(
      userId, {
        $push: {
          followers: userId,
        },
      }, {
        new: true,
      }
    );
    if (findUserDulu) {
      res.status(200).json({
        message: "success follow",
      });
    } else {
      res.status(500).json({
        message: "failed follow",
      });
    }
  }

  static async getFollowers(req, res) {
    const userId = req.params.id;
    const findUser = await userModel.findById(userId).populate('followers');
    if (findUser) {
      res.status(200).json({
        message: "success get followers",
        findUser,
      });
    } else {
      res.status(500).json({
        message: "failed get followers",
      });
    }


  }

  // static async checkCodeOtpPassword(req, res) {
  //   const {
  //     code
  //   } = req.body;
  //   const findCode = await passwordSchema.findOne({
  //     code: code,
  //   });
  //   if (findCode) {
  //     res.status(200).json({
  //       message: "success verify otp",
  //     });
  //   } else {
  //     res.status(404).json({
  //       message: "failed verify otp",
  //     });
  //   }
  // }

  static async changePassword(req, res) {
    const {
      newpassword
    } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.params.id, {
        password: newpassword,
      }, {
        new: true,
      }
    );
    if (user) {
      user
        .save()
        .then((user) => {
          res.status(200).json({
            message: "success change password",
            user,
          });
        })

        .catch((err) => {
          res.status(500).json(err);
        });
    }
  }


  static async getAllUser(req, res) {
    const user = await userModel.find();
    if (user) {
      res.status(200).json({
        message: "success get all user",
        data: user,
      });
    } else {
      res.status(400).json({
        message: "user not found",
      });
    }
  }
  static async getUserById(req, res) {
    const user = await userModel.findOne({
      id: req.params.id,
    });
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "success get user by id",
      data: user,
    });
  }

  static async getAllProducts(req, res, next) {
    const product = await allProduct.find().populate("category");
    if (!product) {
      await res.status(404).json({
        status: 404,
        message: "Products not found",
      });
      return;
    } else {
      res.status(200).json({
        message: "success",
        data: productgetProductbyCategory,
      });
    }
  }
}

module.exports = UserController;