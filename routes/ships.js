const express = require('express');
const router = express.Router();

// Get list of all ships
router.get('/', (req, res) => {
  res.send('List of ships');
});

// Get a specific ship by id
router.get('/:id', (req, res) => {
  res.send(`Details of ship with ID ${req.params.id}`);
});

module.exports = router;