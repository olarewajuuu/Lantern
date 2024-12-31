const express = require('express');
const { register, login, verifyEmail } = require('../controllers/authController');
const router = express.Router();

router.post('/register', (req, res, next) => {
    console.log('Register route hit');
    next();
}, register);
router.post('/login', login);
router.get('/verify-email', verifyEmail);


module.exports = router;
