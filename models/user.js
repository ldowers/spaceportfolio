module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING
  },
  
    {
      classMethods: {
        associate: function(models) {
         
          User.hasMany(models.Image);
        }
      }
    });
  return User;
};
