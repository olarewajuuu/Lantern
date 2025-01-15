const express = require('express');
const { submitStudentDetails } = require('../controllers/studentController');
const { verifyTutorEmail } = require('../controllers/tutorController');


const router = express.Router();

// Registration route with validation
router.post('/submit', submitStudentDetails);
router.get('verify-email/:token', verifyTutorEmail);

module.exports = router;
