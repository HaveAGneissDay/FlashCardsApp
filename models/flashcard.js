const User = require('./user.js');

module.exports = function (sequelize, DataTypes) {
    var Flashcard = sequelize.define("Flashcard", {
        // Giving the User model a name of type STRING
        Category: DataTypes.STRING,
        Title: DataTypes.STRING,
        Body: DataTypes.STRING,
    });
    Flashcard.associate = function (models) {
        // We're saying that a Flashcard should belong to an User
        // A Flashcardcan't be created without an User due to the foreign key constraint
        Flashcard.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Flashcard;
};

