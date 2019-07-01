const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Event Model
const Event = require('../../models/Event');

// @route   GET api/events
// @desc    GET All Events
// @access  Public
router.get('/', (req, res) => {
    Event.find()
        .sort({ start: 1 })
        .then(events => res.json(events))
});

// @route   GET api/events/:userID
// @desc    GET All Events of User
// @access  Private
router.get('/:userID', auth, (req, res) => {
    Event.find({ userID: req.params.userID })
        .sort({ start: 1 })
        .then(events => res.json(events))
});

// @route   POST api/events
// @desc    Create An Event
// @access  Public
router.post('/', auth, (req, res) => {
    const newEvent = new Event({
        start: req.body.start,
        end: req.body.end,
        value: req.body.value,
        color: req.body.color,
        userID: req.body.userID
    });

    newEvent.save().then(event => res.json(event));
});

// @route   DELETE api/events
// @desc    Delete An Event
// @access  Public
router.delete('/:id', auth, (req, res) => {
    Event.findById(req.params.id)
        .then(event => event.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/events/:id
// @desc    Update An Event
// @access  Public
router.post('/:id', auth, (req, res) => {
    Event.findOneAndUpdate( { _id: req.params.id }, { $set: req.body }, { new: true } )
        .then(event => res.json(event))
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;