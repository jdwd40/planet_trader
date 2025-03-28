'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('planets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
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
        type: Sequelize.TEXT,
        allowNull: false
      },
      factions: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      population: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      military_strength: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      factories: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('planets');
  }
};
