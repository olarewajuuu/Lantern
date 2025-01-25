const express = require('express');
const { submitStudentDetails } = require('../controllers/studentController');


const router = express.Router();

// Registration route with validation
router.post('/submit', submitStudentDetails);

module.exports = router;
