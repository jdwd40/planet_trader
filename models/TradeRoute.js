'use strict';

module.exports = (sequelize, DataTypes) => {
  const TradeRoute = sequelize.define('TradeRoute', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    origin_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'planets',
        key: 'id'
      }
    },
    destination_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'planets',
        key: 'id'
      }
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    travel_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    safety_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'trade_routes',
    underscored: true,
    timestamps: true
  });

  TradeRoute.associate = function(models) {
    // A trade route belongs to a planet as origin
    TradeRoute.belongsTo(models.Planet, {
      foreignKey: 'origin_id',
      as: 'origin'
    });
    
    // A trade route belongs to a planet as destination
    TradeRoute.belongsTo(models.Planet, {
      foreignKey: 'destination_id',
      as: 'destination'
    });
  };
  
  return TradeRoute;
};
