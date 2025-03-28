'use strict';

// Simple script to test model loading
const db = require('./models');

async function testModelLoading() {
  try {
    // Try to connect to the database
    await db.sequelize.authenticate();
    console.log('Database connection successful');
    
    // List all loaded models
    console.log('\nLoaded models:');
    Object.keys(db).forEach(modelName => {
      if (modelName !== 'sequelize' && modelName !== 'Sequelize') {
        console.log(`- ${modelName}`);
      }
    });
    
    // Test the Planet model specifically
    if (db.Planet) {
      console.log('\nPlanet model found!');
      console.log('Planet model structure:', Object.keys(db.Planet));
      console.log('Planet is a Sequelize Model?', db.Planet.prototype instanceof db.Sequelize.Model);
      
      // Try creating a test planet
      const testPlanet = {
        name: 'Test Planet',
        type: 'Test',
        resources: JSON.stringify(['Test Resource']),
        factions: JSON.stringify(['Test Faction']),
        population: 1000,
        military_strength: 500,
        factories: JSON.stringify(['Test Factory'])
      };
      
      console.log('\nAttempting to create a test planet...');
      const planet = await db.Planet.create(testPlanet);
      console.log('Success! Created planet with ID:', planet.id);
      
      // Clean up
      await planet.destroy();
      console.log('Test planet deleted');
    } else {
      console.error('Planet model not found in db object!');
    }
  } catch (error) {
    console.error('Error testing model loading:', error);
  } finally {
    // Close the connection
    await db.sequelize.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the test
testModelLoading().then(() => {
  console.log('\n*** Model loading and basic CRUD test successful! ***');
});
