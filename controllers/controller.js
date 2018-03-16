
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

class FlashcardsConstructor {
    constructor(userId, category, title, body) {
        this.Category = category,
        this.Title = title,
        this.Body = body
        this.UserId = userId
    }
}


// create the route for the root page. 
router.get('/', (req, res) => {
    // render the index.handelbars for the '/' route, if user logged in
    // console.log(req.user)
    // var userId = req.user.id
    
    // db.Flashcard.findAll({ where: {UserId: userId}}).then((flashcards) =>{
    //     console.log(flashcards)
    //     var flashCardsArr = []
    //     flashcards.forEach((flashcard) =>{
    //         flashCardsArr.push(flashcard.get())
    //     })
    //     res.render("index", {flashcards: flashCardsArr});
    // })
    res.render("index")
})

// create a route for the flashcards api
router.get('/api/flashcards', (req,res) => {
    db.Flashcard.findAll({}).then((flashcards) =>{
        console.log(flashcards)
        var flashCardsArr = []
        flashcards.forEach((flashcard) =>{
            flashCardsArr.push(flashcard.get())
        })
        res.json({flashcards: flashCardsArr});
    })
})

router.get('/api/flashcard_sets', (req, res) => {
    db.Flashcard.findAll({}).then((flashcards) =>{
        var flashCardsArrCategories = []
        flashcards.forEach((flashcard) =>{
            flashCardsArrCategories.push(flashcard.get().Category)
        })
        res.json({flashcards_sets: flashCardsArrCategories});
    })
})


// checks if the user logged in, we pass it into the '/' get route
function ensureAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        // if user logged in => keep going
        return next()
    } else {
        // if not => redirect user to the login page and send the error message
        req.flash('error', 'You are not logged in')
        res.redirect('/login')
    }
}

// create a route for register page
router.get('/register', (req, res) => {
    // render the register.handlebars
    res.render('register')
})

//route on the wage where user can create a new flashcard
router.get('/createfc', ensureAuthenticate, (req, res) => {
    // render the register.handlebars
    res.render('create_fc')
})

// route to the check all availible sets
router.get('/allsets', (req, res) => {
    // render the register.handlebars
    res.render('sets')
})

// let user to see his/her sets
router.get('/yoursets', ensureAuthenticate, (req, res) => {
    // render the register.handlebars
    res.render('sets')
})

// let user to play flashcards
router.get('/play', (req, res) => {
    // render the register.handlebars
    res.render('play_fc')
})

// create a route for login page 
router.get('/login', (req, res) => {
    // render the login.handlebars
    res.render('login')
})

router.post('/createfc', (req, res) => {
    // render the login.handlebars
    var userId = req.user.id
    var category = req.body.category
    var title = req.body.title
    var body = req.body.flashcard_body

    req.checkBody('category', 'Category is required').notEmpty()
    req.checkBody('title', 'Title is required').notEmpty()
    req.checkBody('flashcard_body', 'Description is required').notEmpty()
    var errors = req.validationErrors()

    if(errors) {
        // if we have the errors (as if 'epmty field') send them to the register page
        res.render('index', {
            errors: errors
        })
    } else {

        var newFlashcard = new FlashcardsConstructor(userId, category, title, body)

        db.Flashcard.create(newFlashcard)
        .then((flashcards) => {
                    req.flash('success_msg', 'New flashcard created')
                    //var flashCards = flashcards.get()
                    //console.log("flashCards ", flashCards)
                    res.redirect('/createfc') //, {flashcards: flashcards.get()})
        })
    }
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

    console.log("validation errors", errors)

    if(errors) {
        // if we have the errors (as if 'epmty field') send them to the register page
        res.render('register', {
            errors: errors
        })
    } else {
        // if all fields are not empty we need to create newUser
       var newUser = new UserConstructor(username, password)
        db.User.create(newUser).then((user)=>{
            req.flash('success_msg', 'You are registered and can now login')
            res.redirect('/login')
        })
        .catch((err) => {
            //console.log("my error ", err.errors[0].message)
            if (err.errors[0].message === "username must be unique") {
                req.flash('error_msg', 'User with this username is already exist, try different username')
                res.redirect('/register')
            }
        })
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

