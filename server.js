const express = require('express')
const app = express()
// setup the mongoose connection (app.js)
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// const methodOverride = require("method-override");

// app.use() => using express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// setup the static / public folder
app.use(express.static("public"));
// setup method override to allow DELETE
// app.use(methodOverride("_method"));

const cors = require("cors");
app.use(cors());

const session = require("express-session");
app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
)
const userController = require('./controllers/user-controller')
app.use('/users', userController)

const listController = require("./controllers/list-controller");
app.use("/list", listController);

const categoryController = require("./controllers/category-controller");
app.use("/category", categoryController);

const sessionsController = require('./controllers/sessions-controller.js')
app.use('/sessions', sessionsController)

// app.get('/', (req, res, next) => {
//   res.send({ currentUser: req.session.currentUser })
// })

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});