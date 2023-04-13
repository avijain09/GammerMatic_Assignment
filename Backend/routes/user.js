const express = require('express');
const router = express.Router();

const {saveCroppedImage,saveUploadedImage} = require('../Controllers/saveImage')


router.post('/save-cropped-image', saveCroppedImage);
router.post('/save-uploaded-image', saveUploadedImage);

module.exports = router;