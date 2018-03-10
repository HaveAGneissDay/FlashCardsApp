const User = require('./user.js');

module.exports = function (sequelize, DataTypes) {
    var Flashcard = sequelize.define("Flashcard", {
        // Giving the Author model a name of type STRING
        Category: DataTypes.STRING,
        //sets can be an array instead of strings
        Title: DataTypes.STRING,
        Body: DataTypes.STRING,
    });
    Flashcard.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Flashcard.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Flashcard;
};

// Sets.hasMany(Flashcards);