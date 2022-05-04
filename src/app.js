const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongooseConnection = require("./config/db");
const multer = require("multer");
var server   = require('http').Server(app);
var io       = require('socket.io')(server);
const sha256 = require("crypto-js/sha256");
// var crypto = require('crypto');
const fileUpload = require('express-fileupload');
var upload = multer();
require('dotenv').config();
const messagebird = require('messagebird')(`${process.env.MESSAGEBIRD_API_KEY}`);

const port = process.env.PORT ||8001;

//cors
app.all('*', function(req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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

//for send sms use messagebird
// const code = 1234
// messagebird.messages.create({
//   originator : '6285161291334',
//   recipient : '625724248746',
//   body : `Hello World, I am a text message and I was hatched by Javascript ${code}!`
// },
// function (err, response) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// }
// );

// app.use(function(req, res, next) {
//   res.setHeader("Content-Type", "application/json");
//   next();
// });
//hashing password use crypto
// const password = "angga"
// const salt = crypto.randomBytes(1664).toString('hex');
// const hash = crypto.pbkdf2Sync(password, salt, 
//   1000, 64, `sha512`).toString(`hex`);
// console.log(hash)
const password = "angga"
const bcy =  bcrypt.hash(password,10)
console.log(bcy)
app.get("/", function(req,res){
  res.send("<h1>Hallo world w</h1>");
})
app.use(cors())
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.use(fileUpload());


mongooseConnection();

require("dotenv").config();
app.use(morgan("tiny"));


//router
const rolesRouter = require("./routes/roles");
const routes = require("./routes");
app.use((err, req, res, next) => {
  if (err) {
    res.status(401).json({ message: err });
  }
});
io.on("connection", function (socket) {
  console.log("User connected", socket.id);

});

app.use(routes);

server.listen(port, () => {
  console.log("listening on port " + port);
});
