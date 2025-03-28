const request = require('supertest');
const app = require('../../app');
const db = require('../../models');
const { v4: uuidv4 } = require('uuid');

/**
 * Makes a request to the app using supertest
 * @param {Object} options - Request options
 * @param {string} options.method - HTTP method (get, post, put, delete)
 * @param {string} options.endpoint - API endpoint
 * @param {Object} [options.body] - Request body
 * @param {Object} [options.query] - Query parameters
 * @param {Object} [options.headers] - Request headers
 * @returns {Promise} - Supertest request
 */
const makeRequest = ({ method, endpoint, body, query, headers }) => {
  let req = request(app)[method](endpoint);
  
  if (query) {
    req = req.query(query);
  }
  
  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      req = req.set(key, value);
    });
  }
  
  if (body && (method === 'post' || method === 'put' || method === 'patch')) {
    req = req.send(body);
  }
  
  return req;
};

/**
 * Creates a test planet in the database
 * @param {Object} customData - Custom planet data to override defaults
 * @returns {Promise<Object>} - Created planet
 */
const createTestPlanet = async (customData = {}) => {
  const { Planet } = db;
  
  const planetData = {
    id: uuidv4(),
    name: `Test Planet ${Math.floor(Math.random() * 1000)}`,
    type: 'Test',
    resources: JSON.stringify(['Test Resource']),
    factions: JSON.stringify(['Test Faction']),
    population: 1000,
    military_strength: 100,
    factories: JSON.stringify(['Test Factory']),
    ...customData
  };
  
  return Planet.create(planetData);
};

/**
 * Truncates database tables between tests
 * @param {Array<string>} [tableNames] - Optional table names to truncate, otherwise all tables
 * @returns {Promise<void>}
 */
const truncateTables = async (tableNames) => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('This function should only be called in test environment');
  }
  
  const models = db.sequelize.models;
  
  if (tableNames && Array.isArray(tableNames)) {
    // Truncate only specific tables
    for (const tableName of tableNames) {
      if (models[tableName]) {
        await models[tableName].destroy({ truncate: { cascade: true }, force: true });
      }
    }
  } else {
    // Truncate all tables
    for (const modelName of Object.keys(models)) {
      if (models[modelName] && typeof models[modelName].destroy === 'function') {
        await models[modelName].destroy({ truncate: { cascade: true }, force: true });
      }
    }
  }
};

module.exports = {
  makeRequest,
  createTestPlanet,
  truncateTables
};
