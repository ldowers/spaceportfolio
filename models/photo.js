module.exports = function(sequelize, DataTypes) {
    var Photo = sequelize.define("Photo", {
        copyright: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.STRING
        },
        explanation: {
            type: DataTypes.TEXT
        },
        hdurl: {
            type: DataTypes.STRING
        },
        media_type: {
            type: DataTypes.STRING
        },
        service_version: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        }
    },{
            
            classMethods: {
                associate: function(models) {
                    Photo.belongsToMany(models.User,
                    {
                        onDelete: "cascade"
                    });
                }
            }
        });
    return Photo;
};