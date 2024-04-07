const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
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
    description: String,
});

const Team = mongoose.model('team', teamSchema);

module.exports = Team;