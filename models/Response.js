const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    text: String,
    date: {type: Date , default: Date.now()},
    _sender: mongoose.Schema.Types.ObjectId
});

module.exports = schema;