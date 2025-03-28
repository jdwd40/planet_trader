'use strict';

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    credits: {
        type: DataTypes.NUMERIC,
        defaultValue: 0
    }
  }, {
      // Other model options go here
      tableName: 'players', // Explicitly specify the table name if it's not the plural of the model
      underscored: true,    // Use underscored names (like password_hash)
      timestamps: true      // Add createdAt and updatedAt timestamps
  });

  Player.associate = function(models) {
    // Define associations here if any
    // e.g., Player.hasMany(models.Ship); 
  };

  return Player;
};
