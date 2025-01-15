const Tutor = require('../models/Tutor');

exports.submitTutorForm = async (req, res) => {
    try {
        const { fullname, phonenumber, email, course, portfolio, courseDuration, proposedFee, uniqueAboutYou } = req.body;
        const { syllabus, cv } = req.files; // file upload
        
        // Validate required fields
        if (!fullname || !phonenumber || !email || !course || !courseDuration || !proposedFee || !uniqueAboutYou) {
            return res.status(400).json({ error: 'All required fields must be filled.' });
        }

        if (!syllabus || !cv) {
            return res.status(400).json({ error: 'Both syllabus and CV files are required.' });
        }

        const tutor = new Tutor({
            fullname,
            phonenumber, // Save the correct phone field
            email,
            course,
            portfolio: portfolio || null,
            courseDuration,
            proposedFee,
            uniqueAboutYou,
            syllabus: syllabus[0].path,
            cv: cv[0].path,
        });

        await tutor.save();

        res.status(201).json({ message: 'Tutor form submitted', tutor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
