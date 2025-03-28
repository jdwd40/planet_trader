// Directly load environment variables to troubleshoot
require('dotenv').config({ 
  path: `./.env.${process.env.NODE_ENV || 'development'}`
});

// If we're in test mode, make sure we use the test database
if (process.env.NODE_ENV === 'test') {
  console.log('Using TEST environment configuration');
}

console.log('Loading database config with:');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Username:', process.env.DB_USERNAME || 'jd');
console.log('Database:', process.env.NODE_ENV === 'test' ? 
  (process.env.TEST_DB_NAME || 'sorstar_test') : 
  (process.env.DB_NAME || 'sorstar_dev'));

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
