const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongooseConnection = require("./config/db");
const multer = require("multer");
var server   = require('http').Server(app);
var io       = require('socket.io')(server);
const fileUpload = require('express-fileupload');
var upload = multer();
require('dotenv').config();

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

// app.use(function(req, res, next) {
//   res.setHeader("Content-Type", "application/json");
//   next();
// });


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
