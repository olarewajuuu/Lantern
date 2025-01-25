const { body } = require('express-validator');

const tutorValidationRules = [
    body('fullname')
        .notEmpty()
        .withMessage('Full name is required.')
        .isLength({ min: 3 })
        .withMessage('Full name must be at least 3 characters long.'),
    body('phone')
        .notEmpty()
        .withMessage('Phone number is required.')
        .isMobilePhone()
        .withMessage('Invalid phone number.'),
    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email address.'),
    body('course')
        .notEmpty()
        .withMessage('Course is required.'),
    body('courseDuration')
        .notEmpty()
        .withMessage('Course duration is required.'),
    body('proposedFee')
        .notEmpty()
        .withMessage('Proposed fee is required.')
        .isNumeric()
        .withMessage('Proposed fee must be a number.'),
    body('uniqueAboutYou')
        .notEmpty()
        .withMessage('Something unique about yourself is required.')
        .isLength({ min: 10 })
        .withMessage('Unique details must be at least 10 characters long.'),
];

module.exports = tutorValidationRules;
