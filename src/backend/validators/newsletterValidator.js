const { body } = require('express-validator');

const newsletterValidationRules = [
    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email address.'),
];

module.exports = newsletterValidationRulesValidationRules;
