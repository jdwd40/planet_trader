const express = require('express');
const router = express.Router();
const planetController = require('../controllers/planet-controllers');

// Import the middleware
const { findPlanetMiddleware } = require('../controllers/planet-controllers');

// Create a new planet
router.post('/', planetController.createPlanet);

// Get list of all planets
router.get('/', planetController.findAllPlanets);

// Apply middleware only to routes with :id parameter
// Get a specific planet by id
router.get('/:id', findPlanetMiddleware, planetController.findPlanetById);

// Update a planet by id
router.put('/:id', findPlanetMiddleware, planetController.updatePlanet);

// Delete all planets (Use with caution!) - MUST be before /:id
router.delete('/all', planetController.deleteAllPlanets);

// Delete a planet by id
router.delete('/:id', findPlanetMiddleware, planetController.deletePlanet);


module.exports = router;
