const express = require('express');
const { submitStudentDetails, verifyStudentEmail } = require('../controllers/studentController');


const router = express.Router();

// Registration route with validation
router.post('/submit', submitStudentDetails);
router.get('/verify-email/:token', verifyStudentEmail);

module.exports = router;
