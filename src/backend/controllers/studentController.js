const Student = require('../models/Student');
const sendEmail = require('../utils/sendEmail');

// Submit Student Details
exports.submitStudentDetails = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, location, sponsor, selectedCourse } = req.body;
        console.log(req.body);

        console.log(req.body);

        // Validate required fields
        if (!fullName || !phoneNumber || !email || !location || !selectedCourse) {
            return res.status(400).json({ error: 'All required fields must be filled.' });
        }

        // Check if the email is already registered
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        }

        // Create the student
        const student = new Student({
            fullName,
            phoneNumber,
            email,
            location,
            sponsor: sponsor || null, // Optional field
            selectedCourse,
<<<<<<< HEAD
=======
            isVerified: false, // Default to not verified
            verificationToken, // Store the token for verification
>>>>>>> a29e777074af308b4f85a99cedaa3a39414c210c
        });

       const studentSave = await student.save();

        // Send verification email
<<<<<<< HEAD
        const studentSubject = 'Thank you for Registering with Lantern Academy';
        const studentMessage  = `
            Hi ${fullname},
=======
        const from = process.env.STUDENT_EMAIL || 'no-reply@yourdomain.com'; // Fallback for sender email
        const subject = 'Please Verify Your Email';
        const message = `
            Hi ${fullName},
            
            Thank you for submitting your details! To complete the registration process, please verify your email by clicking the link below:
            
            ${verificationUrl}

            Best regards,
            Lantern Academy
        `;
>>>>>>> a29e777074af308b4f85a99cedaa3a39414c210c

            Thank you for registering with Lantern Academy. We are excited to have you on board.
            We will contact you soon regarding the selected course(s).

<<<<<<< HEAD
            Details:
            -- FullName: ${fullname}
            -- Phone Number: ${phoneNumber}
            -- Email: ${email}
            -- Location: ${location}
            -- Sponsor: ${sponsor || 'None'}
            -- Selected Course(s): ${selectedCourse}

            Best Regards,
            Lantern Academy
        `;
        await sendEmail(email, studentSubject, studentMessage);

        // Notification for admin
        const adminEmail = process.env.STUDENT_EMAIL;
        const adminSubject = 'New Student Registration Submitted';
        const adminMessage = `
            A new student application has been submitted.
            
            Name: ${fullName}
            Email: ${email}
            Phone: ${phoneNumber}
            Location: ${location}
            Sponsor: ${sponsor || 'N/A'}
            Course: ${selectedCourse}
        `;
        await sendEmail(adminEmail, adminSubject, adminMessage);

        res.status(201).json({ message: 'Student details submitted successfully.' });
=======
        res.status(201).json({ message: 'Student form submitted successfully. Please check your email to verify your account.' });
>>>>>>> a29e777074af308b4f85a99cedaa3a39414c210c
    } catch (error) {
        console.error('Error submitting student form:', error);
        res.status(500).json({ error: 'An error occurred while submitting the form.' });
    }
};

<<<<<<< HEAD
=======
// Verify Student Email
exports.verifyStudentEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Find the student by the verification token
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
        const message = `
            Hi ${student.fullName},
            
            Your email has been verified successfully. You can now proceed to access all our services.

            Best regards,
            Lantern Academy
        `;
        await sendEmail(student.email, subject, message);
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'An error occurred during email verification.' });
    }
};
>>>>>>> a29e777074af308b4f85a99cedaa3a39414c210c
