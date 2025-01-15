const express = require('express');
const { submitTutorForm } = require('../controllers/tutorController');
const upload = require('../utils/fileUpload'); // Import multer configuration

const router = express.Router();

router.post(
    '/submit',
    upload.fields([
        { name: 'syllabus', maxCount: 1 },
        { name: 'cv', maxCount: 1 },
    ]), // Accept `syllabus` and `cv` as file fields
    submitTutorForm
);

module.exports = router;
