const Tutor = require('../models/Tutor');
const sendEmail = require('../config/email');
const generateToken = require('../utils/generateToken');


exports.submitTutorForm = async (req, res) => {
    try {
        const tutor = await Tutor.create(req.body);
        tutor.verificationToken = generateToken();
        await tutor.save();

        const verificationLink = `${process.env.FRONTEND_URL}/verify-tutor?token=${tutor.verificationToken}`;
        await sendEmail(tutor.email, 'Tutor Email Verification', `
            <h3>Verify Your Email</h3>
            <p>Please click the link below to verify your email:</p>
            <a href="${verificationLink}">${verificationLink}</a>
        `);
        res.status(201).json({ message: 'Tutor form submitted', tutor });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.verifyTutorEmail = async (req, res) => {
    try {
        const tutor = await Tutor.findOne({ verificationToken: req.query.token });
        if (!tutor) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        tutor.isVerified = true;
        tutor.verificationToken = null;
        await tutor.save();

        res.status(200).json({ message: 'Tutor email verified successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};