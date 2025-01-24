const Student = require('../models/Student');
const sendEmail = require('../utils/sendEmail');


// Submit Student Details
exports.submitStudentDetails = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, location, sponsor, selectedCourse } = req.body;
        console.log(req.body);

        // Validate required fields
        if (!fullName || !phoneNumber || !email || !location || !selectedCourse) {
            return res.status(400).json({ error: 'All required fields must be filled' });
        }

        // Check if email already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create the student
        const student = new Student({
            fullName,
            phoneNumber,
            email,
            location,
            sponsor: sponsor || null,
            selectedCourse,
        });

        await student.save();

        // Send verification email
        const studentSubject = 'Thank you for Registering with Lantern Academy';
        const studentMessage  = `
            Hi ${fullname},

            Thank you for registering with Lantern Academy. We are excited to have you on board.
            We will contact you soon regarding the selected course(s).

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
    } catch (error) {
        console.error('Error submitting student form:', error.message);
        res.status(500).json({ error: 'An error occurred while submitting the form.' });
    }
};

