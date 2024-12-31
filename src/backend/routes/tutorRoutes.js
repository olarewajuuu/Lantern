const express = require('express');
const { submitTutorForm, verifyTutorEmail } = require('../controllers/tutorController');
const router = express.Router();


router.post('/submit', submitTutorForm);
router.get('/verify-tutor', verifyTutorEmail);

module.exports = router;