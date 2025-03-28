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
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    influence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'factions',
    underscored: true,
    timestamps: true
  });
  
  Faction.associate = function(models) {
    Faction.hasMany(models.Politics, {
      foreignKey: 'faction_id',
      as: 'politics'
    });
  };
  
  return Faction;
};
