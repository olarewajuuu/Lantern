const express = require('express');
const { submitReview } = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Use the middleware and attach the correct callback
router.post('/submit', authMiddleware, submitReview);

module.exports = router;