'use strict';
const { v4: uuidv4 } = require('uuid');
const planetsData = require('../db/data/dev-data/planets');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Transform the data to match the database schema
    const planets = planetsData.map(planet => ({
      id: uuidv4(),
      name: planet.name,
      type: planet.type,
      resources: JSON.stringify(planet.resources),
      factions: JSON.stringify(planet.factions),
      population: planet.population,
      military_strength: planet.militaryStrength,
      factories: JSON.stringify(planet.factories),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Planets', planets, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Planets', null, {});
  }
};
