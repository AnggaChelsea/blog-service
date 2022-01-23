const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongooseConnection = require("./config/db");

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongooseConnection();

require("dotenv").config();
app.use(morgan("tiny"));

app.use(bodyParser.json());


//router
const rolesRouter = require("./routes/roles");
const routes = require('./routes')
// mongoose.connect('mongodb+srv://olx:Sayangmamah1.@cluster0.ma8no.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
app.use((err, req, res, next) => {
  if (err) {
    res.status(401).json({message:err});
  }
})
app.use(routes);

app.listen(8000, () => {
  console.log("listening on port 8000");
});
