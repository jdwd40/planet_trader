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
        model: 'planets',
        key: 'id'
      }
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ships: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('ships');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('ships', JSON.stringify(value));
      }
    },
    defense_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'military',
    underscored: true,
    timestamps: true
  });
  
  Military.associate = function(models) {
    // Military belongs to a planet
    Military.belongsTo(models.Planet, {
      foreignKey: 'planet_id',
      as: 'planet'
    });
  };
  
  return Military;
};
