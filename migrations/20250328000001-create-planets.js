'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Planets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      resources: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      factions: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      population: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      military_strength: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      factories: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Planets');
  }
};
