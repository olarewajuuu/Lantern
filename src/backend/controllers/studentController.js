const User = require('../models/Student');


// Register User
exports.submitStudentDetails = async (req, res) => {
    try {
        const { fullname, phonenumber, email, location, sponsor, course } = req.body;
        
        if (!fullname || !phonenumber || !email || !location || !sponsor || !course) {
            return res.status(400).json({ error: 'All required fields must be filled' });
        }
        // create the user
        const student = new User({
            fullname,
            phonenumber, 
            email, 
            location,
            sponsor: sponsor || null, 
            course
        });
        await student.save();

        res.status(201).json({ message: 'Student details submitted .' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

