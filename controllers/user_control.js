const express = require('express')

const router = express.Router()

// let user to play flashcards
router.get('/:category', (req, res) => {
    // console.log("req /play", req)
    var category = req.params.category
       console.log("passedSet inside of get /play ", category)
       res.render('play_fc', { category: category})
   })


module.exports = router