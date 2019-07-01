const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
    start: {
        type: Number,
        required: true
    },
    end: {
        type: Number,
        required: true
    },
    value: String,
    color: String,
    userID: {
        type: String,
        required: true
    }
});

module.exports = Event = mongoose.model('event', EventSchema);