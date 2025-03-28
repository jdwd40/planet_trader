'use strict';

module.exports = (sequelize, DataTypes) => {
  const Politics = sequelize.define('Politics', {
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
    faction_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Factions',
        key: 'id'
      }
    },
    influence: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});

  Politics.associate = function(models) {
    // Politics belongs to a planet
    Politics.belongsTo(models.Planet, {
      foreignKey: 'planet_id',
      as: 'planet'
    });
    
    // Politics belongs to a faction
    Politics.belongsTo(models.Faction, {
      foreignKey: 'faction_id',
      as: 'faction'
    });
  };

  return Politics;
};
