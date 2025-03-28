// Planet Controllers

const { Planet, sequelize } = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

/**
 * Create a new planet
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Planet data
 * @param {string} req.body.name - Planet name
 * @param {string} req.body.type - Planet type
 * @param {Array<string>} req.body.resources - Planet resources
 * @param {Array<string>} req.body.factions - Planet factions
 * @param {number} req.body.population - Planet population
 * @param {number} req.body.military_strength - Planet military strength
 * @param {Array<string>} req.body.factories - Planet factories
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.createPlanet = async (req, res) => {
    try {
        const planet = await Planet.create(req.body);
        res.status(201).json(planet);
    } catch (error) {
        // Check if it's a validation error
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
            // Extract specific error messages if needed, or send a generic 400
            const messages = error.errors ? error.errors.map(e => e.message) : [error.message];
            res.status(400).json({ error: 'Validation failed', messages });
        } else {
            // Log unexpected errors for debugging
            console.error('Error creating planet:', error);
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
};

/**
 * Retrieve all planets
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.findAllPlanets = async (req, res) => {
    try {
        // Extract query parameters
        const { type, name, sortBy, order = 'ASC' } = req.query;
        let whereClause = {};
        let orderClause = [];

        if (type) {
            whereClause.type = type;
        }
        if (name) {
            // Add logic for partial name matching if needed (e.g., using Op.like)
            whereClause.name = name; 
        }

        if (sortBy) {
            // Validate sortBy field if necessary
            orderClause.push([sortBy, order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']);
        }

        const planets = await Planet.findAll({ 
            where: whereClause,
            order: orderClause
        });
        res.status(200).json(planets);
    } catch (error) {
        console.error('Error finding planets:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
};

/**
 * Retrieve a planet by ID
 * 
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Planet ID
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.findPlanetById = async (req, res) => {
    try {
        const planet = await Planet.findByPk(req.params.id);
        if (!planet) {
            return res.status(404).json({ error: 'Planet not found' });
        }
        res.status(200).json(planet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Update a planet
 * 
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Planet ID
 * @param {Object} req.body - Updated planet data
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.updatePlanet = async (req, res) => {
    try {
        const planet = await Planet.findByPk(req.params.id);
        if (!planet) {
            return res.status(404).json({ error: 'Planet not found' });
        }
        await planet.update(req.body);
        res.status(200).json(planet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Delete a planet by ID
 * 
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Planet ID
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.deletePlanet = async (req, res) => {
    try {
        const planet = await Planet.findByPk(req.params.id);
        if (!planet) {
            return res.status(404).json({ error: 'Planet not found' });
        }
        await planet.destroy();
        // Return 204 No Content on successful deletion
        res.status(204).send(); 
    } catch (error) {
        console.error('Error deleting planet:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
};

/**
 * Delete all planets
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.deleteAllPlanets = async (req, res) => {
    try {
        await Planet.destroy({ where: {} });
        res.status(200).json({ message: 'All planets deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
