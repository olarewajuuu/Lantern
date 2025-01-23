const express = require('express');
const { submitSubscribe  } = require('../controllers/subscribeController');


const router = express.Router();

// use middleware
router.post('/', submitSubscribe);

module.exports = router;