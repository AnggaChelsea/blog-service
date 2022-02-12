const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongooseConnection = require("./config/db");
const multer = require("multer");
var server   = require('http').Server(app);
var io       = require('socket.io')(server);
const nodemailer = require("nodemailer");

const port = process.env.PORT ||8000;
//cors

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/assets/images");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null,fileName + "-" + Date);
  },
});

const upload = multer({ storage: storage });
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", function (socket) {
  console.log("User connected", socket.id);
});
mongooseConnection();

require("dotenv").config();
app.use(morgan("tiny"));

app.use(bodyParser.json());

//router
const rolesRouter = require("./routes/roles");
const routes = require("./routes");
app.use((err, req, res, next) => {
  if (err) {
    res.status(401).json({ message: err });
  }
});
app.use(routes);

server.listen(port, () => {
  console.log("listening on port " + port);
});
