const userModel = require("../models/user");
const messageModel = require("../models/message");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendVeryficationEmail = require("../helper/emailVerifycation");
const nodemailer = require("../config/nodemailer");
class UserController {
  static async register(req, res) {
    const {
      name,
      email,
      password,
      image,
      countInStock,
      alamat,
      role,
      numberphone,
    } = req.body;
    const newUser = new userModel({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      image,
      countInStock,
      alamat,
      role,
      numberphone,
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

  // static loginUser(req, res) {
  //   const secret = process.env.SCRET_KEY;
  //   const userStatus = userModel.find();
  //   console.log(userStatus.status);
  //   const email = req.body.email;
  //   const password = req.body.password;

  //   const usercheck = userModel.findOne({
  //     email,
  //   });
  //   if (usercheck) {
  //     if (bcrypt.compareSync(password, usercheck.password)) {
  //       const token = jwt.sign(
  //         {
  //           userId: usercheck.id,
  //         },
  //         secret,
  //         {
  //           expiresIn: "1h",
  //         }
  //       );

  //       res.status(200).json({
  //         email: usercheck.email,
  //         username: usercheck.name,
  //         token,
  //       });
  //     } else {
  //       res.status(400).json({
  //         message: "password or email wrong",
  //       });
  //     }
  //   } else {
  //     res.status(400).json({
  //       message: "email tidak terdaftar",
  //     });
  //   }
  // }

  static async loginUser(req, res){
    const {email, password} = req.body;
    const user = await userModel.findOne({
      email
    })
    if(user){
      if(bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({
          userId: user.id
        }, "sayangmamah", {
          expiresIn: '1h'
        })
        return res.status(200).json({
          message: 'success login',
          token
        })
      }else{
        res.status(400).json({
          message: 'password or email wrong'
        })
      }
    }else{
      res.status(400).json({
        message: 'email not found'
      })
    }
  }

  static async message(req, res) {
    const { message, uploadfile } = req.body;
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

  static sendmessagetouser(req, res) {
    const { message, uploadfile, userId } = req.body;
    const {paramUserId} = req.params.id;
    const userid = userModel.findOne({
      id: paramUserId,
    });
    if (!userid) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      const newChat = new messageModel({
        message,
        uploadfile,
        userId: userid,
      });
      newChat
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
  }
  static async confirmaitoncode(req, res) {
    const { email } = req.body;
    const user = await userModel.findOne({
      email,
    });
    if (user) {
      const secret = process.env.SCRET_KEY;
      const token = jwt.sign(
        {
          userId: user.id,
        },
        secret,
        {
          expiresIn: "1h",
        }
      );
      const email = user.email;
      const name = user.name;
      const code = Math.floor(Math.random() * 1000000);
      const link = `${process.env.API_URL}/user/verify?token=${token}&code=${code}`;
      const mailOptions = {
        from: "freelancer9@gmail.com",
        to: email,
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
      }
      );
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
}

module.exports = UserController;
