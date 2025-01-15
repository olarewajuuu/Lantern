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

        const tutor = new Tutor({
            fullName,
            phoneNumber, // Save the correct phone field
            email,
            course,
            portfolio: portfolio || null,
            duration,
            fee,
            uniqueInfo,
            syllabusFile: syllabusFile[0].path,
            cvFile: cvFile[0].path,
        });

        await tutor.save();

        res.status(201).json({ message: 'Tutor form submitted', tutor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
