// Directly load environment variables to troubleshoot
require('dotenv').config({ path: './.env.development' });

// Print environment variables for debugging
console.log('Loading database config with:');
console.log('Username:', process.env.DB_USERNAME || 'jd');
console.log('Password:', process.env.DB_PASSWORD ? '[SET]' : '[NOT SET]');
console.log('Database:', process.env.DB_NAME || 'sorstar_dev');

module.exports = {
  development: {
    username: 'jd',
    password: 'K1ller1921',
    database: 'sorstar_dev',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'jd',
    password: 'K1ller1921',
    database: 'sorstar_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
