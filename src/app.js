const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
require('dotenv').config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongooseConnection = require("./config/db");
const configSql = require("./config/sql_connect");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mysql = require('mysql2');
var helmet = require("helmet");

require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(helmet());

//cors
app.all("*", function (req, res, next) {
	var origin = req.get("origin");
	res.header("Access-Control-Allow-Origin", origin);
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});
const allowedOrigins = [
	'capacitor://localhost',
	'ionic://localhost',
	'http://localhost',
	'http://localhost:8080',
	'http://localhost:8100',
  ];
  const corsOptions = {
	origin: (origin, callback) => {
	  if (allowedOrigins.includes(origin) || !origin) {
		callback(null, true);
	  } else {
		callback(new Error('Origin not allowed by CORS'));
	  }
	},
  };
  app.options('*', cors(corsOptions));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:8888");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.use(
	cors({
		origin: "*",
	})
);


//includes socketio

// io.on("connection", (socket) => {
// 	socket.emit('connect', {message: 'a new client connected'})
// 	console.log("User connected");
// 	socket.on('disconnect', function () {
// 		console.log('user disconnected');
// 	  });
// })

const password = "angga";
const bcy = bcrypt.hash(password, 10);
console.log(bcy);
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

mongooseConnection();
const dbpool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'osi_admin',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
  });

  app.use('/connection', (req, res) => {
	dbpool.execute('SELECT * FROM navbar', (err, rows) => {
		if(err){
			res.json({
				message: 'Error executing connection query failed'
			})
		}
		res.json({message: 'Connection success', data: rows});
	})
} )

app.get("/", function (req, res) {
	if (configSql.configSql.db) {
		res.send("mysql connect");
	}
});

require("dotenv").config();
app.use(morgan("tiny"));

//router
const routes = require("./routes");

const connections = []
app.use(routes);
// io.sockets.on('connection',(socket) => {
//     connections.push(socket);
//     console.log(' %s sockets is connected', connections.length); // this is not printing

//     socket.on('disconnect', () => {
//        connections.splice(connections.indexOf(socket), 1);
//     });

//     socket.emit('server message', router);

//  }); 

http.listen(port, () => {
	console.log("listening on port " + port);
});
