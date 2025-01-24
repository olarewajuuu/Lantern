const Tutor = require('../models/Tutor');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Submit Tutor Form
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

        // Check if the email is already registered
        const existingTutor = await Tutor.findOne({ email });
        if (existingTutor) {
            return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        }

        // Generate email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Create new tutor
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
        const verificationLink = `${process.env.BACKEND_URL}/api/tutors/verify-email/${verificationToken}`;


        // Send email verification
        const from = process.env.TUTOR_EMAIL; // Sender email for tutors
        const subject = 'Please Verify Your Email';
        const message = `Hi ${fullName},\n\nPlease verify your email by clicking the link below:\n${verificationLink}`;

        await sendEmail(email, subject, message, from);

        // Send admin notification email
        const adminEmail = 'Lanternacademyreg@gmail.com';
        const adminSubject = 'New Tutor Registration Submitted';
        const adminMessage = `
            A new tutor application has been submitted.
            
            Name: ${fullName}
            Email: ${email}
            Course: ${course}
            Phone: ${phoneNumber}
        `;
        await sendEmail(adminEmail, adminSubject, adminMessage);

        res.status(201).json({ message: 'Tutor form submitted. Please check your email to verify your account.' });
    } catch (error) {
        console.error('Error submitting tutor form:', error.message);
        res.status(500).json({ error: 'An error occurred while submitting the form.' });
    }
};



// Verify Tutor Email
exports.verifyTutorEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Find the tutor by the verification token
        const tutor = await Tutor.findOne({ verificationToken: token });

        if (!tutor) {
            return res.status(400).json({ error: 'Invalid or expired token.' });
        }

        // Mark the tutor as verified
        tutor.isVerified = true;
        tutor.verificationToken = null; // Clear the token
        await tutor.save();

        // Send a success response
        res.status(200).json({ message: 'Email verified successfully.' });

        // Send notification email to the tutor
        const subject = 'Email Verified Successfully';
        const message = `
            Hi ${tutor.fullName},
            
            Your email has been verified successfully. You can now proceed.

            Best Regards,
            Lantern Academy Team
        `;
        await sendEmail(tutor.email, subject, message);

        // Optional: Notify admin about successful verification
        const adminEmail = 'Lanternacademyreg@gmail.com';
        const adminSubject = 'Tutor Email Verified';
        const adminMessage = `
            The following tutor has verified their email:
            
            Name: ${tutor.fullName}
            Email: ${tutor.email}
        `;
        await sendEmail(adminEmail, adminSubject, adminMessage);


        // redirectoing to homepage for success verification
        const redirectUrl = `
            ${process.env.FRONTEND_URL}/?verified=true
        `;
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error verifying email:', error.message);
        res.status(500).json({ error: 'An error occurred while verifying the email.' });
    }
};
