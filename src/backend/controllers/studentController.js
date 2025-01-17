const User = require('../models/Student');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Register User
exports.submitStudentDetails = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, location, sponsor, selectedCourse } = req.body;
        // validate require fields
        if (!fullName || !phoneNumber || !email || !location || !sponsor || !selectedCourse) {
            return res.status(400).json({ error: 'All required fields must be filled' });
        }

        // check if email already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // generate the email token 
        const verificationToken = crypto.randomBytes(32).toString('hex');


        // create the user
        const student = new Student({
            fullName,
            phoneNumber, 
            email, 
            location,
            sponsor: sponsor || null, 
            selectedCourse,
            isVerified: false,
            verificationToken
        });
        await student.save();


        // create token link
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
        const message = `
            Hi ${fullName},
            Thank you for registering as a student. Please verify your email by clicking the link below:
            ${verificationLink}

            If you did not request this, please ignore this email.
        `;

        await sendEmail(email, subject, message);


        res.status(201).json({ message: 'Student details submitted .' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.verifyStudentEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Find student by token
        const student = await Student.findOne({ verificationToken: token });

        if (!student) {
            return res.status(400).json({ error: 'Invalid or expired token.' });
        }

        // Mark as verified
        student.isVerified = true;
        student.verificationToken = null; // Clear the token
        await student.save();

        res.status(200).json({ message: 'Email verified successfully!' });

        // Send notification email
        const subject = "Email Verified Successfully";
        const message = `Hi ${student.fullName},\n\nYour email has been verified successfully. You can now proceed.`;
        await sendEmail(student.email, subject, message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
