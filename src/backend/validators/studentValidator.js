const { body } = require('express-validator');

const studentValidationRules = [
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
    body('location')
        .notEmpty()
        .withMessage('Location is required.'),
    body('course')
        .notEmpty()
        .withMessage('Course selection is required.')
        .isIn([
            'Software Engineering',
            'ICAN',
            'GMAT',
            'Data Science/Analytics',
            'Backend Development',
            'IELTS',
            'Digital Marketing',
            'Project Management',
            'Virtual Assistant',
        ])
        .withMessage('Invalid course selected.'),
];

module.exports = studentValidationRules;
