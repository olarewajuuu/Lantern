const express = require('express');
const { submitReview } = require('../controllers/reviewController');


const router = express.Router();

// Use the middleware and attach the correct callback
router.post('/submit', submitReview);

module.exports = router;