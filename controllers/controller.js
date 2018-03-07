const express = require('express')

const router = express.Router()

router.get('/', (err, res) => {
        res.render("index");
})
router.get('/register', (req, res) => {
    res.render('register')

})

router.post('/register', (req, res) => {
    console.log(req.body)
})

router.get('/login', (err, res) => {
    res.render("login");
})

module.exports = router