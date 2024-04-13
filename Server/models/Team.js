const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    id: {type: Number},
    name: { 
        type: String,
        required: true,
        unique: false,
    },
    description: String,
    league: {
        type: String,
        required: true,
    },
});

const Team = mongoose.model('team', teamSchema);

module.exports = Team;