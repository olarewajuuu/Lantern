const Tutor = require('../models/Tutor');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

exports.submitTutorForm = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, course, portfolio, duration, fee, uniqueInfo } = req.body;
        const { syllabusFile, cvFile } = req.files; // file upload
        
        // Validate required fields
        if (!fullName || !phoneNumber || !email || !course || !duration || !fee || !uniqueInfo) {
            return res.status(400).json({ error: 'All required fields must be filled.' });
        }

        if (!syllabusFile || !cvFile) {
            return res.status(400).json({ error: 'Both syllabus and CV files are required.' });
        }

        // Generate email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const tutor = new Tutor({
            fullName,
            phoneNumber,
            email,
            course,
            portfolio: portfolio || null,
            duration,
            fee,
            uniqueInfo,
            syllabusFile: syllabusFile[0].path,
            cvFile: cvFile[0].path,
            isVerified: false, // Default to false until email is verified
            verificationToken, // Save the verification token
        });

        await tutor.save();

        // Create a verification link
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
        
        // Send email verification
        const subject = "Please Verify Your Email";
        const message = `
            Hi ${fullName},
            Thank you for submitting your tutor application. Please verify your email by clicking the link below:
            ${verificationLink}

            If you did not request this, please ignore this email.
        `;

        await sendEmail(email, subject, message);

        res.status(201).json({ message: 'Tutor form submitted. Please check your email to verify your account.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.verifyTutorEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const tutor = await Tutor.findOne({ verificationToken: token });

        if (!tutor) {
            return res.status(400).json({ error: "Invalid or expired token." });
        }

        tutor.isVerified = true;
        tutor.verificationToken = null;
        await tutor.save();

        res.status(200).json({ message: "Email verified successfully." });

        // send notification email
        const subject = 'Email verified ';
        const message = `Hi ${tutor.fullName}, \n\n Your email has been verified.`;
        await sendEmail(tutor.email, subject, message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}