'use strict';

module.exports = (sequelize, DataTypes) => {
  const Military = sequelize.define('Military', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    planet_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Planets',
        key: 'id'
      }
    },
    troops: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    fleets: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});

  Military.associate = function(models) {
    // A military unit belongs to a planet
    Military.belongsTo(models.Planet, {
      foreignKey: 'planet_id',
      as: 'planet'
    });
  };

  return Military;
};
