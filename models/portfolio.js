module.exports = function(sequelize, DataTypes) {
  var Portfolio = sequelize.define("Portfolio", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    imageURL: {
      type: DataTypes.TEXT,
      validate:{
          isURL:true
    }
  },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  },
    {   
      classMethods: {
        associate: function(models) {
          Portfolio.belongsTo(models.User,
            {
              onDelete: "cascade",
              foreignKey: {
                allowNull: false
              }
            });
        }
      }
    });
  return Portfolio;
};
