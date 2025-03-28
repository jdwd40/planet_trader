const express = require('express');
const bcrypt = require('bcryptjs');
const Player = require('../models/Player');

const router = express.Router();

// Register new player
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create player
        const player = await Player.create({
            username,
            email,
            password_hash
        });

        res.status(201).json({ message: "Player registered", playerId: player.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering new player" });
    }
});

// Login player
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create player
        const player = await Player.create({
            username,
            email,
            password_hash
        });

        res.status(201).json({ message: "Player registered", playerId: player.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering new player" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for player
        const player = await Player.findOne({ where: { email } });
        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, player.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { playerId: player.id },
            'your-secret-key', // Replace 'your-secret-key' with a real key and keep it secret
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
