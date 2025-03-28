'use strict';

module.exports = (sequelize, DataTypes) => {
  const Planet = sequelize.define('Planet', {
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
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resources: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    factions: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    population: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    military_strength: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    factories: {
      type: DataTypes.JSONB,
      defaultValue: {}
    }
  }, {});

  Planet.associate = function(models) {
    // A planet has many trade routes as origin
    Planet.hasMany(models.TradeRoute, {
      foreignKey: 'origin_id',
      as: 'originTradeRoutes'
    });
    
    // A planet has many trade routes as destination
    Planet.hasMany(models.TradeRoute, {
      foreignKey: 'destination_id',
      as: 'destinationTradeRoutes'
    });
    
    // A planet has one military unit
    Planet.hasOne(models.Military, {
      foreignKey: 'planet_id',
      as: 'military'
    });
    
    // A planet has many politics
    Planet.hasMany(models.Politics, {
      foreignKey: 'planet_id',
      as: 'politics'
    });
  };

  return Planet;
};
