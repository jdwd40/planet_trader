'use strict';

/**
 * Planet model definition
 * 
 * Represents a celestial body in the game universe, containing resources, factions,
 * and military strength. Planets can be connected through trade routes and have
 * various types (e.g., Mining, Agricultural).
 * 
 * @param {Sequelize} sequelize - The Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Planet} - The defined Planet model
 */
module.exports = (sequelize, DataTypes) => {
  const Planet = sequelize.define('Planet', {
    /**
     * Unique identifier for the planet
     * @type {string}
     */
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    /**
     * Name of the planet
     * @type {string}
     * @required
     * @validate {notEmpty}
     */
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    /**
     * Type of the planet (e.g., Mining, Agricultural, Industrial)
     * @type {string}
     * @required
     */
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    /**
     * Array of resources available on the planet
     * @type {Array<string>}
     * @required
     */
    resources: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('resources');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('resources', JSON.stringify(value));
      }
    },
    /**
     * Array of factions present on the planet
     * @type {Array<string>}
     * @required
     */
    factions: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('factions');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('factions', JSON.stringify(value));
      }
    },
    /**
     * Population of the planet
     * @type {number}
     * @required
     * @default 0
     */
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    /**
     * Military strength of the planet
     * @type {number}
     * @required
     * @default 0
     */
    military_strength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    /**
     * Array of factories on the planet
     * @type {Array<string>}
     * @required
     */
    factories: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('factories');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('factories', JSON.stringify(value));
      }
    }
  }, {
    /**
     * Model configuration options
     */
    tableName: 'planets',
    underscored: true,
    timestamps: true
  });

  /**
   * Define model associations
   * @param {Object} models - All defined models
   */
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
