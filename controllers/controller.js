
// require dependencies 
const express = require('express')
const passport = require('./passport')
var LocalStrategy = require('passport-local').Strategy;
const router = express.Router()
var bcrypt = require('bcrypt');
// download the models of User from user.js and Sequelize from index.js
const db = require('../models')
//

// create the constructor for the newUser. We will pass it into the sequelize
class UserConstructor {
    constructor(username, password) {
        this.username = username,
        this.password = password
    }
  }

// create the route for the root page. 
// ensureAuthenticate cheks if the user login in
router.get('/', ensureAuthenticate, (err, res) => {
    // render the index.handelbars for the '/' rote, if user logged in
        res.render("index");
})

// checks if the user logged in, we pass it into the '/' get route
function ensureAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        // if user logged in => keep going
        return next()
    } else {
        // if not => redirect user to the login page and send the error message
        req.flash('error', 'You are not ligged in')
        res.redirect('/login')
    }
}

// create a route for register page
router.get('/register', (req, res) => {
    // render the register.handlebars
    res.render('register')
})

// create a route for login page 
router.get('/login', (req, res) => {
    // render the login.handlebars
    res.render('login')
})


// create the route to send the registration info of user after the subbmitting the form
router.post('/register', (req, res) => {

    // store the new user name and password in the variables
    var username = req.body.username
    var password = req.body.password
    var conf_password = req.body.conf_password

    // Validation
    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()
    req.checkBody('conf_password', 'Passwords do not match').equals(req.body.password)

    var errors = req.validationErrors()

    if(errors) {
        // if we have the errors (as if 'epmty field') send them to the register page
        res.render('register', {
            errors: errors
        })
    } else {
        // if all fields are not empty we need to create newUser
       var newUser = new UserConstructor(username, password)

       // store the newUser in the database
        db.User.create(newUser).then((user)=>{
                // if(ifCreated){
                    
                //     req.flash('success_msg', 'You are registered and can now login')
                //     // and redirect user on login page
                //     res.redirect('/login')
                // } else {
                    // send user error message
                    req.flash('error_msg', 'User with htis name is already exist')
                    // and redirect user on login page
                    res.redirect('/register')
                }

            )
        
    }
})


// create the route for the User post request after he/she subbmittes the form
router.post('/login',
// use passport to authenticate 
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true}),
  // callback function redirects to the homepage
  function(req, res) {
    res.redirect('/');
  }
);

// setting the logout route
router.get('/logout', (req, res) => {
    // end the user session
    req.logout()
    // sending the success message
    req.flash('success_msg', 'You are logged out')
    // redirect user to the login page after logout
    res.redirect('/login')
   
})

module.exports = router