const express = require('express');
const { submitTutorForm } = require('../controllers/tutorController');
const upload = require('../utils/fileUpload');

const router = express.Router();

router.post(
    '/submit',
    upload.fields([
        { name: 'syllabusFile', maxCount: 1 },
        { name: 'cvFile', maxCount: 1 },
    ]), // Accept `syllabus` and `cv` as file fields
    submitTutorForm
);

module.exports = router;
