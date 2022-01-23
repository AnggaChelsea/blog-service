const userModel = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class UserController {
  static async register(req, res) {
    const { name, email, password, countInStock, alamat, role, numberphone } =
      req.body;
    const newUser = new userModel({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      countInStock,
      alamat,
      role,
      numberphone,
    });
    newUser
      .save()
      .then((response) => {
        res.status(200).json({ message: "success add user", data: response });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  static getUser(req, res) {
    let users = userModel
      .find().populate('role')
      .select("-password")
      if (users.role === "seller") {
        res.status(200).json(response);
      }
        res.status(500).json(err);
  }
  static loginUser(req, res) {
    const secret = process.env.SCRET_KEY;
    const { email, password } = req.body;
   
    userModel
      .findOne({ email })
      .then((response) => {
        if (response) {
          if (bcrypt.compareSync(password, response.password)) {
            const token = jwt.sign(
              {
                userId: response.id,
              },
              secret,
              { expiresIn: "1h" }
            );
           
            res
              .status(200)
              .json({ email: response.email, username: response.name, token });
          } else {
            res.status(400).json({ message: "password or email wrong" });
          }
        } else {
          res.status(400).json({ message: "email tidak terdaftar" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = UserController;
