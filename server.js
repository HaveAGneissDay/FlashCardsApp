const express = require('express')
const bodyParser = require('body-parser')
const expressHandlebars = require("express-handlebars");
const routes = require("./controllers/controller.js");
const db = require("./models");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')


const PORT = process.env.PORT || 3031;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes)
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Express session

app.use(session({
    secret: 'enigmaticcatlikestunaandchicken',
    saveUninitialized: true,
    resave: true
}))

// // Express Validator

// app.use



db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });