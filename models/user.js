const Sequelize = require('sequelize');
const sequelize = new Sequelize('flashcard_db', 'root', '', {
  dialect: 'mysql',
});

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("Users", {
      // Giving the Author model a name of type STRING
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    });
  
    return User;
  };