const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:password@localhost:5432/mydatabase');

const Player = sequelize.define('Player', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    credits: {
        type: DataTypes.NUMERIC,
        defaultValue: 0
    }
}, {
    // Other model options go here
    tableName: 'players', // Explicitly specify the table name if it's not the plural of the model
});

module.exports = Player;
