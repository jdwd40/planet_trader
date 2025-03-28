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
app.use('/api/planets', planetsRouter);
app.use('/api/ships', shipsRouter);
app.use('/api/players', playersRouter);

// Start the server
// Only start listening if the file is run directly (not required as a module)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// Export the app instance for testing or requiring elsewhere
module.exports = app;
