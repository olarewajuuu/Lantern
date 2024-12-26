const Tutor = require('../models/Tutor');

exports.submitTutorForm = async (req, res) => {
    try {
        const tutor = await Tutor.create(req.body);
        res.status(201).json({ message: 'Tutor form submitted', tutor });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};