const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongooseConnection = require("./config/db");
const multer = require("multer");
const formidable = require('express-formidable');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path')

var helmet = require('helmet');
const sha256 = require("crypto-js/sha256");

require('dotenv').config();
const messagebird = require('messagebird')(`${process.env.MESSAGEBIRD_API_KEY}`);
const port = process.env.PORT ||8001;

app.use(helmet());
 
//cors
app.all('*', function(req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}); 

app.get('/', (req, res) => {
  res.send('Hello World!');
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

app.use(cors({
  origin: '*'
}));
// 

//for send sms use messagebird


app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

const password = "angga"
const bcy =  bcrypt.hash(password,10)
console.log(bcy)
app.use(cors())
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
})); 

mongooseConnection();

require("dotenv").config();
app.use(morgan("tiny"));


//router
const rolesRouter = require("./routes/roles");
const routes = require("./routes");
// app.use((err, _req, res, ) => {
//   if (err) {
//     err.status(401).json({ message: err });
//   }
// });
// io.on("connection", (socket) => {
//   console.log("User connected");
//   socket.on("disconnect", ()=>{
//   console.log("Disconnected")
// });
// socket.on("getDoc", docId => {
//   safeJoin(docId);
//   socket.emit("document", documents[docId]);
// });
// });

app.use(routes);

http.listen(port, () => {
  console.log("listening on port " + port);
});
