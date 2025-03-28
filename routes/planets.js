const express = require('express');
const router = express.Router();
const planetController = require('../controllers/planet-controllers');

// Create a new planet
router.post('/', planetController.createPlanet);

// Get list of all planets
router.get('/', planetController.findAllPlanets);

// Get a specific planet by id
router.get('/:id', planetController.findPlanetById);

// Update a planet by id
router.put('/:id', planetController.updatePlanet);

// Delete a planet by id
router.delete('/:id', planetController.deletePlanet);

// Delete all planets (Use with caution!)
router.delete('/all', planetController.deleteAllPlanets);

module.exports = router;
