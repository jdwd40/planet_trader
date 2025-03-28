'use strict';

module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
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
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    base_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    rarity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'resources',
    underscored: true,
    timestamps: true
  });
  
  Resource.associate = function(models) {
    // Define associations if needed
  };
  
  return Resource;
};
