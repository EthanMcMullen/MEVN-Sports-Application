const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    name: { // Sport Name age group and gender, all in one name Senior Boys Basketball, U16 Girls Vollyball or something like that
        type: String,
        required: true,
        unique: true,
    },
    description: String,
});

const League = mongoose.model('league', leagueSchema);

module.exports = League;