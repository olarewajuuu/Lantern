const Student = require('../models/Student');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Submit Student Details
exports.submitStudentDetails = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, location, sponsor, selectedCourse } = req.body;

        // Validate required fields
        if (!fullName || !phoneNumber || !email || !location || !sponsor || !selectedCourse) {
            return res.status(400).json({ error: 'All required fields must be filled' });
        }

        // Check if email already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Generate the email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Create a new student
        const student = new Student({
            fullName,
            phoneNumber,
            email,
            location,
            sponsor: sponsor || null,
            selectedCourse,
            isVerified: false,
            verificationToken,
        });
        await student.save();

        // Send verification email to student
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
        const studentEmailText = `Hi ${fullName},\n\nPlease verify your email by clicking the link below:\n${verificationUrl}`;
        await sendEmail(email, 'Email Verification', studentEmailText);

        // Send notification email to Lantern Academy
        const adminEmailText = `A new student registration has been submitted:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phoneNumber}\nCourse: ${selectedCourse}`;
        await sendEmail('Lanternacademyreg@gmail.com', 'New Student Registration', adminEmailText);

        res.status(201).json({ message: 'Student form submitted. Please verify your email.' });
    } catch (error) {
        console.error('Error submitting student form:', error.message);
        res.status(500).json({ error: 'An error occurred while submitting the form.' });
    }
};



exports.verifyStudentEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Find the student by the token
        const student = await Student.findOne({ verificationToken: token });

        if (!student) {
            return res.status(400).json({ error: 'Invalid or expired token.' });
        }

        // Mark the student as verified
        student.isVerified = true;
        student.verificationToken = null; // Clear the token
        await student.save();

        // Send a success response
        res.status(200).json({ message: 'Email verified successfully!' });

        // Send notification email to the student
        const subject = 'Email Verified Successfully';
        const message = `Hi ${student.fullName},\n\nYour email has been verified successfully. You can now proceed.`;
        await sendEmail(student.email, subject, message);
    } catch (error) {
        console.error('Error verifying email:', error.message);
        res.status(500).json({ error: 'An error occurred during email verification.' });
    }
};
