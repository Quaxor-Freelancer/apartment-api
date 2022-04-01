const mongoose = require('mongoose');

const timeSchema = mongoose.Schema({
    hour: {
        type: Number,
        default: 0
    },
    minute: {
        type: Number,
        default: 0
    }
})

module.exports = timeSchema





