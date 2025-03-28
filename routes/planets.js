const express = require('express');
const router = express.Router();

// Get list of all planets
router.get('/', (req, res) => {
  res.send('List of planets');
});

// Get a specific planet by id
router.get('/:id', (req, res) => {
  res.send(`Details of planet with ID ${req.params.id}`);
});

module.exports = router;
