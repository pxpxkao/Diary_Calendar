const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Diary Model
const Diary = require('../../models/Diary');

// @route   GET api/diarys
// @desc    GET All Diarys
// @access  Public
router.get('/', (req, res) => {
    Diary.find()
        .sort({ date: 1 })
        .then(diarys => res.json(diarys))
});

// @route   GET api/diarys/:userID
// @desc    GET All Diarys of User
// @access  Private
router.get('/:userID', auth, (req, res) => {
    Diary.find({ userID: req.params.userID })
        .sort({ date: 1 })
        .then(diarys => res.json(diarys))
});

// @route   POST api/diarys
// @desc    Create A Diary
// @access  Public
router.post('/', (req, res) => {
    const newDiary = new Diary({
        uniqueID: req.body.uniqueID,
        date: req.body.date,
        userID: req.body.userID,
    });

    newDiary
        .save()
        .then(diary => res.json(diary))
        .catch(err => res.status(404).json({ message: "Diary already exists!" }));
});

// @route   POST api/diarys/:id
// @desc    Update A Diary
// @access  Public
router.post('/:id', (req, res) => {
    Diary.findOneAndUpdate( { _id: req.params.id }, { $set: req.body }, { new: true } )
        .then(diary => res.json(diary))
        .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE api/diarys/:id
// @desc    Delete A Diary
// @access  Public
router.delete('/:id', (req, res) => {
    Diary.findById(req.params.id)
        .then(diary => diary.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/diarys/:id/comments
// @desc    Add new comment to Diary
// @access  Public
router.post('/:id/comments', (req, res) => {
    Diary.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: req.body.comment } }, { new: true })
        .then(diary => res.json(diary.comments[diary.comments.length-1]))
        .catch(err => res.status(404).json({success: false}));
});

// @route   POST api/diarys/:id/comments/:com_id
// @desc    Update A Comment in Diary
// @access  Public
router.post('/:id/comments/:com_id', (req, res) => {
    Diary.findOneAndUpdate({ _id: req.params.id }, { $set: { "comments.$[com]": req.body } }, { arrayFilters: [{ "com._id": req.params.com_id }], new: true })
        .then(diary => res.json(diary))
        .catch(err => res.status(404).json({success: false, reqbody: res.body}));
});

// @route   DELETE api/diarys/:id/comments/:com_id
// @desc    Delete A Comment
// @access  Public
router.delete('/:id/comments/:com_id', (req, res) => {
    Diary.updateOne({ _id: req.params.id }, { $pull: { comments: { _id: req.params.com_id } } })
        .then(() => res.json({success: true}))
        .catch(err => res.status(404).json({success: false}));
});

// @route   POST api/diarys/:id/images
// @desc    Add new image to Diary
// @access  Public
router.post('/:id/images', (req, res) => {
    Diary.findOneAndUpdate({ _id: req.params.id }, { $push: { images: req.body.image } }, { new: true })
        .then(diary => res.json(diary.images[diary.images.length-1]))
        .catch(err => res.status(404).json({success: false}));
});

// @route   POST api/diarys/:id/images/:img_id
// @desc    Update An Image in Diary
// @access  Public
router.post('/:id/images/:img_id', (req, res) => {
    Diary.findOneAndUpdate({ _id: req.params.id }, { $set: { "images.$[img]": req.body } }, { arrayFilters: [{ "img._id": req.params.img_id }], new: true })
        .then(diary => res.json(diary))
        .catch(err => res.status(404).json({success: false, reqbody: res.body}));
});

// @route   DELETE api/diarys/:id/images/:img_id
// @desc    Delete An Image
// @access  Public
router.delete('/:id/images/:img_id', (req, res) => {
    Diary.updateOne({ _id: req.params.id }, { $pull: { images: { _id: req.params.img_id } } })
        .then(() => res.json({success: true}))
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;