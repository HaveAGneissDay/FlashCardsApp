const Sequelize = require('sequelize');
const sequelize = new Sequelize('assoc', 'root', '', {
    dialect: 'mysql',
});

const Sets = sequelize.define('Set', {
    name: Sequelize.STRING
})

Sets.hasMany(Flashcards);
module.exports = function (sequelize, DataTypes) {
    var Flashcard = sequelize.define("FlashCard", {
        // Giving the Author model a name of type STRING
        Sets: DataTypes.String,
        Title: DataTypes.STRING,
        Body: DataTypes.STRING,
    });

    return Flashcard;
};