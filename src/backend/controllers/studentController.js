const Student = require('../models/Student');
const sendEmail = require('../utils/sendEmail');

// Submit Student Details
exports.submitStudentDetails = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, location, sponsor, selectedCourse } = req.body;
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
        });
        console.log(student);
       await student.save();

        // Send verification email
        const from = process.env.STUDENT_EMAIL || 'no-reply@yourdomain.com'; // Fallback for sender email
        const subject = 'Please Verify Your Email';
        const message = `
            
            
            Thank you for submitting your details.

            Best regards,
            Lantern Academy
        `;
        await sendEmail(email, subject, message, from);

        // Notification for admin
        const adminEmail = process.env.EMAIL_USERNAME;
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


    } catch (error) {
        console.error('Error submitting student form:', error);
        res.status(500).json({ error: 'An error occurred while submitting the form.' });
    }
};
