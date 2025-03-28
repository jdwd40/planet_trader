const { Planet } = require('../models');
const { ValidationError, UniqueConstraintError, Op } = require('sequelize');
const validator = require('validator'); // Import validator library

// Define allowed sort columns to prevent unwanted input
const allowedSortColumns = ['name', 'type', 'population', 'military_strength'];

/**
 * Handles errors by returning an appropriate HTTP response.
 * @param {Object} res - Express response object.
 * @param {Error} error - The caught error.
 * @returns {Object} - Express response.
 */
function handleError(res, error) {
    if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        const messages = error.errors ? error.errors.map(e => e.message) : [error.message];
        return res.status(400).json({ error: 'Validation failed', messages });
    }
    console.error('Error:', error);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
}

/**
 * Middleware to find a planet by ID, validate ID, and handle 404.
 * Attaches the found planet to req.planet.
 */
async function findPlanetMiddleware(req, res, next) {
    const { id } = req.params;

    // Validate UUID format using validator library
    if (!validator.isUUID(id)) {
        return res.status(400).json({ error: 'Invalid planet ID format. Must be a valid UUID.' });
    }

    try {
        const planet = await Planet.findByPk(id);
        if (!planet) {
            return res.status(404).json({ error: 'Planet not found' });
        }
        req.planet = planet; // Attach planet to request object
        next(); // Proceed to the next middleware/handler
    } catch (error) {
        // Pass errors to the centralized error handler
        handleError(res, error);
    }
}

/**
 * Create a new planet
 */
exports.createPlanet = async (req, res) => {
    try {
        const planet = await Planet.create(req.body);
        return res.status(201).json(planet);
    } catch (error) {
        return handleError(res, error);
    }
};

/**
 * Retrieve all planets
 */
exports.findAllPlanets = async (req, res) => {
    try {
        const { type, name, sortBy, order = 'ASC' } = req.query;
        const whereClause = {};
        const orderClause = [];
        
        if (type) {
            whereClause.type = type;
        }
        if (name) {
            // Use partial matching for the planet name
            whereClause.name = { [Op.like]: `%${name}%` };
        }
        if (sortBy && allowedSortColumns.includes(sortBy)) {
            orderClause.push([sortBy, order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']);
        }
        
        const planets = await Planet.findAll({ 
            where: whereClause,
            order: orderClause
        });
        return res.status(200).json(planets);
    } catch (error) {
        return handleError(res, error);
    }
};

/**
 * Retrieve a planet by ID
 * Assumes findPlanetMiddleware has run successfully.
 */
exports.findPlanetById = async (req, res) => {
    // Middleware already found the planet and attached it to req.planet
    return res.status(200).json(req.planet);
};

/**
 * Update a planet
 * Assumes findPlanetMiddleware has run successfully.
 */
exports.updatePlanet = async (req, res) => {
    try {
        // Middleware found the planet (req.planet)
        await req.planet.update(req.body);
        await req.planet.reload(); // Reload the instance to get the latest data
        return res.status(200).json(req.planet);
    } catch (error) {
        return handleError(res, error);
    }
};

/**
 * Delete a planet by ID
 * Assumes findPlanetMiddleware has run successfully.
 */
exports.deletePlanet = async (req, res) => {
    try {
        // Middleware found the planet (req.planet)
        await req.planet.destroy();
        return res.status(204).send();
    } catch (error) {
        return handleError(res, error);
    }
};

/**
 * Delete all planets
 */
exports.deleteAllPlanets = async (req, res) => {
    try {
        await Planet.destroy({ where: {} });
        return res.status(200).json({ message: 'All planets deleted' });
    } catch (error) {
        return handleError(res, error);
    }
};

// Export the middleware so it can be used in routes.js
exports.findPlanetMiddleware = findPlanetMiddleware;
