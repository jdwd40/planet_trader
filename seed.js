const db = require('./models'); // Adjust the path if your models/index.js is elsewhere
const planetsData = require('./db/data/dev-data/planets.js');

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await db.sequelize.authenticate();
    console.log('Database connection successful.');

    console.log('Syncing database... This will drop and recreate tables!');
    // force: true will drop the table if it already exists
    await db.sequelize.sync({ force: true });
    console.log('Database synced!');

    console.log('Seeding planets...');
    await db.Planet.bulkCreate(planetsData);
    console.log('Planets seeded successfully!');

    // Add seeding for other models here if needed
    // e.g., await db.Ship.bulkCreate(shipsData);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    console.log('Closing database connection...');
    await db.sequelize.close();
    console.log('Database connection closed.');
  }
};

// Run the seeding function
seedDatabase();
