const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./db');

const app = express()
const PORT = process.env.PORN || 3000;

app.use(cors());
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
});