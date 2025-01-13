const User = require('../models/User');


// Register User
exports.submitStudentDetails = async (req, res) => {
    try {
        const { fullname, phone, email, location, sponsor, course } = req.body;
        
        if (!fullname || !phone || !email || !location || !sponsor || !course) {
            return res.status(400).json({ error: 'All required fields must be filled' });
        }
        // create the user
        const student = new User({
            fullname,
            phone, 
            email, 
            location,
            sponsor, 
            course
        });
        await student.save();

        res.status(201).json({ message: 'Student details submitted .' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

