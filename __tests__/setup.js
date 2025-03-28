// Import database models
const db = require('../models');

// Set the environment to test
process.env.NODE_ENV = 'test';

// Global setup - runs once before all tests
beforeAll(async () => {
  try {
    // Connect to the test database
    await db.sequelize.authenticate();
    console.log('Test database connection established successfully.');
    
    // Sync the test database (create tables if they don't exist)
    // Note: Force true will drop tables first - USE WITH CAUTION
    // In test environment this is usually acceptable
    await db.sequelize.sync({ force: true });
    console.log('Database synced for testing.');
  } catch (error) {
    console.error('Unable to connect to the test database:', error);
    process.exit(1);
  }
});

// Global teardown - runs once after all tests
afterAll(async () => {
  await db.sequelize.close();
  console.log('Test database connection closed.');
});

// Reset database state between tests if needed
// This is commented out as individual test files handle their own cleanup
// beforeEach(async () => {
//   await db.sequelize.truncate({ cascade: true });
// });

// Global test timeout (adjust as needed)
jest.setTimeout(10000);
