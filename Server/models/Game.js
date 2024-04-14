const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    id: { type: Number, unique: true, requited: true, },
    name: { // School team name
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    gameType: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    description: String,
    location: {
        type: String,
        required: true,
    },
    opposingTeam: {
        type: String,
        required: true,
    },
    league: {
        type: String,
        required: true,
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;