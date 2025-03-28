const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './.env.development' });

// Log the environment variables to verify they're loaded
console.log('Environment variables:');
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '[SET]' : '[NOT SET]');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);

// Create a direct connection with hardcoded values (for testing)
const sequelize = new Sequelize('sorstar_dev', 'jd', 'K1ller1921', {
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: console.log
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // Close the connection
    await sequelize.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();
