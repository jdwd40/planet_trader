const { Planet } = require('../models');
const { ValidationError, UniqueConstraintError, Op } = require('sequelize');

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
 */
exports.findPlanetById = async (req, res) => {
    try {
        const planet = await Planet.findByPk(req.params.id);
        if (!planet) {
            return res.status(404).json({ error: 'Planet not found' });
        }
        return res.status(200).json(planet);
    } catch (error) {
        return handleError(res, error);
    }
};

/**
 * Update a planet
 */
exports.updatePlanet = async (req, res) => {
    try {
        const planet = await Planet.findByPk(req.params.id);
        if (!planet) {
            return res.status(404).json({ error: 'Planet not found' });
        }
        await planet.update(req.body);
        return res.status(200).json(planet);
    } catch (error) {
        return handleError(res, error);
    }
};

/**
 * Delete a planet by ID
 */
exports.deletePlanet = async (req, res) => {
    try {
        const planet = await Planet.findByPk(req.params.id);
        if (!planet) {
            return res.status(404).json({ error: 'Planet not found' });
        }
        await planet.destroy();
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
