'use strict';

module.exports = (sequelize, DataTypes) => {
  const Faction = sequelize.define('Faction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    ideology: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Faction.associate = function(models) {
    // A faction has many politics
    Faction.hasMany(models.Politics, {
      foreignKey: 'faction_id',
      as: 'politics'
    });
  };

  return Faction;
};
