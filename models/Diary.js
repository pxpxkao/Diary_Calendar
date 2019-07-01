const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

// Create Schema
const DiarySchema = new Schema({
    uniqueID: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    comments: [{ 
        body: {
            type: String,
            required: true
        },
        lastTranslateX: {
            type: Number,
            default: 0
        },
        lastTranslateY: {
            type: Number,
            default: 0
        },
        scale: {
            type: Number,
            default: 1
        },
        rotateDeg: {
            type: Number,
            default: 0.0
        },
        z: {
            type: Number,
            default: 1
        },
    }],
    images: [{ 
        url: {
            type: String,
            required: true
        },
        lastTranslateX: {
            type: Number,
            default: 0
        },
        lastTranslateY: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 20
        },
        rotateDeg: {
            type: Number,
            default: 0.0
        },
        z: {
            type: Number,
            default: 1
        },
    }],
    z: {
        type: Number,
        default: 1
    },
    userID: {
        type: String,
        required: true
    },
});

module.exports = Diary = mongoose.model('diary', DiarySchema);