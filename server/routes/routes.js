const express = require('express');
const router = express.Router();
const API = require('../controllers/controllers');
const multer = require('multer');

//multer middleware
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, './uploads')
 },
 filename: (req, file, callback) => {
    const filetype = file.mimetype;
    const fileformate = filetype.split("/")[1];
    callback(null, Date.now() + '.' + fileformate);
 }
});
const upload = multer({ storage: storage }).single('image');


router.get('/', API.fetchAllPost);
router.get('/:id', API.fetchPostByID);
router.post('/', upload, API.createPost);
router.patch('/:id', upload, API.updatePost);
router.delete('/:id', API.deletePost);

module.exports = router;