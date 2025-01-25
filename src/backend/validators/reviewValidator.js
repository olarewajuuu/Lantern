const { body } = require('express-validator');

const reviewValidationRules = [
    body('message')
        .notEmpty()
        .withMessage('Message is required.')
        .isLength({ min: 10 })
        .withMessage('Message must be at least 10 characters long.'),
];

module.exports = reviewValidationRules;
