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
const api = process.env.API_URL;

//router
const productsRoutes = require("./routes/products");
const categoryRouter = require("./routes/category");
const userRoutes = require("./routes/user");
const rolesRouter = require("./routes/roles");
// mongoose.connect('mongodb+srv://olx:Sayangmamah1.@cluster0.ma8no.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
app.use(productsRoutes);
app.use(categoryRouter);
app.use(userRoutes);
app.use(rolesRouter);

app.listen(8000, () => {
  console.log("listening on port 8000");
});
