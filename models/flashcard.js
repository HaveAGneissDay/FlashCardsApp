const Sequelize = require('sequelize');
const sequelize = new Sequelize('flashcard_db', 'root', '', {
    dialect: 'mysql',
});

//Solution: combine into one model 

module.exports = function (sequelize, DataTypes) {
    var Flashcard = sequelize.define("FlashCard", {
        // Giving the Author model a name of type STRING
        Sets: DataTypes.String,
        //sets can be an array instead of strings
        Title: DataTypes.STRING,
        Body: DataTypes.STRING,
    });

    return Flashcard;
};

Sets.hasMany(Flashcards);