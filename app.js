const express = require('express');
const app = express();
const port = 9001; // You can choose any port that is free on your system

const planetsRouter = require('./routes/planets');
const shipsRouter = require('./routes/ships');
const playersRouter = require('./routes/players');

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route for home page
app.get('/', (req, res) => {
    res.send('Welcome to the Space Trading Game Backend!');
});

// Use routers
app.use('/planets', planetsRouter);
app.use('/ships', shipsRouter);
app.use('/players', playersRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
