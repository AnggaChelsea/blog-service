const userModel = require("../models/user");
const messageModel = require("../models/message");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendVeryficationEmail = require("../helper/emailVerifycation");
const nodemailer = require("../config/nodemailer");
const allProduct = require("../models/allproducts");
class UserController {

  static async followeUser(req, res){
    const 
      followers
     = req.body;
    const user = await userModel.findById(
      req.params.id
    );
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

  static async getChatByBuyer(req, res){
    const { buyerId, sellerId } = req.body;
    const chat = await messageModel.find({
      buyerId,
      sellerId
    }).populate('buyerId', 'name').populate('sellerId', 'name');
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
    const followersId = req.body;
    const {
      id
    } = req.params;
    const user = await userModel.findById(id);
    if (user) {
      const newFollow = await new userModel({
        followers: followersId,
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

  

  static async register(req, res) {
    
    const {
      name,
      email,
      password,
      image,
      countInStock,
      alamat,
      role,
    } = req.body;
    const filee = req.file;
    const tolowcasename = name.toLowerCase();
    const mailtolowecase = email.toLowerCase();
    const alamatTolower = alamat.toLowerCase();
    const newUser = new userModel({
      name: tolowcasename,
      email: mailtolowecase,
      password: bcrypt.hashSync(password, 10),
      image: filee,
      countInStock,
      alamat: alamatTolower,
      role,
    });
    newUser
      .save()
      .then((response) => {
        res.status(200).json({
          message: "success add user",
          data: response,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async loginUser(req, res) {
    const {
      email,
      password
    } = req.body;
    const user = await userModel.findOne({
      email
    })
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
          userId: user.id,
          userRole: user.role
        }, "sayangmamah", {
          expiresIn: '1h'
        })
        return res.status(200).json({
          success: true,
          id: user.id,
          name: user.name,
          image: user.image,
          alamat: user.alamat,
          token
        })
      } else {
        res.status(404).json({
          message: 'password or email wrong'
        })
      }
    } else {
      res.status(500).json({
        success: false,
      })
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

  static async confirmaitoncode(req, res) {
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
        from: "freelancer9@gmail.com",
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

  static async changePassword(req, res) {
    const {
      newpassword
    } = req.body;
    const user = await userModel.findByIdAndUpdate(req.params.id, {
      password: newpassword,
    },{
      new: true
    });
    if(user){
      user.save().then((user)=>{
        res.status(200).json({
          message: "success change password",
          user
        })
      })

      .catch((err)=>{
        res.status(500).json(err)
      })
    }
  }

  static async registeruser(req, res) {
    
    const {
      name,
      email,
      password,
      image,
      countInStock,
      alamat,
      role,
    } = req.body;
    const tolowcasename = name.toLowerCase();
    const mailtolowecase = email.toLowerCase();
    const alamatTolower = alamat.toLowerCase();
    const newUser = new userModel({
      name: tolowcasename,
      email: mailtolowecase,
      password: bcrypt.hashSync(password, 10),
      image,
      countInStock,
      alamat: alamatTolower,
      role,
    });
    newUser
      .save()
      .then((response) => {
        res.status(200).json({
          message: "success add user",
          data: response,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
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
    })
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "success get user by id",
      data: user,
    })
  }
  

  static async getAllProducts(req, res, next) {
    const product = await allProduct
      .find()
      .populate("category");
    if (!product) {
      await res.status(404).json({
        status: 404,
        message: "Products not found",
      });
      return

    } else {
      res.status(200).json({
        message: "success",
        data: productgetProductbyCategory
      });
    }
  }
}

module.exports = UserController;