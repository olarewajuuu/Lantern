const express = require('express');
const { submitTutorForm } = require('../controllers/tutorController');
const upload = require('../utils/fileUpload'); 

const router = express.Router();

// Validate tutor form on submission
router.post('/submit', upload.fields([{ name: 'syllabus' }, { name: 'cv' }]), submitTutorForm);
module.exports = router;
