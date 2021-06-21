const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
cloudinary.config({
    // Replace with your cloudinary api key
    cloud_name: 'dme1jdiam',
    api_key: '928815446816671',
    api_secret: 'vbUmDjwIGbqwwoysjuF1kKB1r8s'
});

// ,transformation: [{ width: 500, height: 500, crop: "limit" }]
const storage = cloudinaryStorage({cloudinary: cloudinary,folder: "demo",allowedFormats: ["jpg", "png", "jpeg", "gif"]});
const upload = multer({ 
    storage: storage,
    limits: {fileSize: 10000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// @route   POST api/upload
// @desc    Upload file
// @access  Public
router.post('/', upload, (req, res) => {
    upload(req, res, (err) => {
        if(err){
            return res.json({ msg: err})
        } else {
            if(req.file == undefined) {
                return res.json({ msg: 'Error: No File Selected!'})
            } else {
                return res.json({ msg: 'File Uploaded!', file: req.file.url })
            }
        }
    })
    console.log(req.file)
});

module.exports = router;
