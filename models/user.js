

//require brypt do decrypt the password
var bcrypt = require('bcrypt');
const saltRounds = 10;
const Flashcard = ('./flashcard.js');


module.exports = (sequelize, DataTypes) => {
// create the User model for Sequelize
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  });

  // before save the password in the database we should encrypt it
  User.beforeCreate((newUser, callback) => {
    // returns the incrypted password
    return bcrypt.hash(newUser.password, saltRounds) 
    // brypt is "slow" and we need to use promices to work with encrypted password
    .then((hashPassword) => {
      newUser.password = hashPassword
    }).catch(err => {
      // catch error
      if (err) console.log(err);

    });
  })
  User.associate = function (models) {
    // Associating User with Flashcard
    // When an User is deleted, also delete any associated Flashcard
    User.hasMany(models.Flashcard, {
      onDelete: "cascade"
    });
  };
  return User
}
