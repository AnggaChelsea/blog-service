const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongooseConnection = require("./config/db");
const multer = require("multer");
var server   = require('http').Server(app);
var io       = require('socket.io')(server);
const nodemailer = require("nodemailer");
require('dotenv').config();

const port = process.env.PORT ||8002;

//cors
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/assets/images");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null,fileName + "-" + Date);
  },
});

app.get("/", function(req,res){
  res.send("<h1>Hallo world</h1>");
})

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

app.use(cors({origin: 'https://arcane-tor-29221.herokuapp.com/'}));
app.use(routes);

server.listen(port, () => {
  console.log("listening on port " + port);
});
