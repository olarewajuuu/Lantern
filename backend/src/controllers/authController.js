const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../config/email');


// Register User
exports.register = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { firstname, lastname, email, phone, password } = req.body;
        // create the user and get the verification token
        const verificationToken = generateToken();
        const user = new User({
            firstname, lastname, email, phone, password, verificationToken
        });
        await user.save();
        
        // send the verification email
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${user.verificationToken}`;
        await sendEmail(user.email,
            'Email Verification', 
            `
                <h3>Verify Your Email</h3>
                <p>Please click the link below to verify your email:</p>
                <a href="${verificationLink}">Verify Email</a>
            `
        );
        res.status(201).json({ message: 'User register succesfully. Please check your email to verify your accoun.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// verify email
exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.query.token });
        if (!user) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.pasword))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        if (!user.isVerified){
            return res.status(401).json({ error: 'Email not verified. Please verify your email' });
        }
        const token = jwt.sign({ id: user.__id }, process.env.JWT_SECRET, { expiresIn: '5h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


