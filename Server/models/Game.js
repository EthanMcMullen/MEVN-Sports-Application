const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: { // Sport Team Name (Basketball, Baseball, Volleyball)
        type: String,
        required: true,
    },
    division: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
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
    additionalNotes: String,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;