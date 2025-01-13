const Tutor = require('../models/Tutor');


exports.submitTutorForm = async (req, res) => {
    try {
        const { fullname, phone, email, cousre, portfolio, courseDuration, proposedFee, uniqueAboutYou } = req.body;
        const { syllabus, cv } = req.files; // file upload
        
        if (!fullname || !phone || !email || !course || !courseDuration || !proposedFee || !uniqueAboutYou) {
            return res.status(400).json({ error: 'All required fields must be filled.' });
        }

        const tutor = new Tutor({
            fullname,
            phone,
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