module.exports = function(sequelize, DataTypes) {
    var Portfolio = sequelize.define("Portfolio", {
        status: DataTypes.STRING
    });
    return Portfolio;
};