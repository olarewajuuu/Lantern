const express = require('express');
const { submitNewsletter  } = require('../controllers/newsletterController');


const router = express.Router();

// use middleware
router.post('/', submitNewsletter);

module.exports = router;