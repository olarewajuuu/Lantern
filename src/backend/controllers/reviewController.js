const Review = require('../models/Review');
const sendEmail = require('../utils/sendEmail');

exports.submitReview = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const review = new Review({ message });

        await review.save();

        // Send notification email to Lantern Academy
        const adminEmailText = `A new review has been submitted: Review: ${message}`;
        await sendEmail('Lanternacademyreg@gmail.com', 'New Review Submitted', adminEmailText);

        res.status(201).json({ message: 'Review submitted successfully.' });
    } catch (error) {
        console.error('Error submitting review:', error.message);
        res.status(500).json({ error: 'An error occurred while submitting the review.' });
    }
};
