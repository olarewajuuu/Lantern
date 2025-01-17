const Review = require('../models/Review');
const sendEmail = require('../utils/sendEmail');

exports.submitReview = async (req, res) => {
    try {
        const { reviewText } = req.body;

        if (!reviewText) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const review = new Review({ reviewText });

        await review.save();

        // Send notification email to Lantern Academy
        const adminEmailText = `A new review has been submitted: Review: ${reviewText}`;
        await sendEmail('Lanternacademyreg@gmail.com', 'New Review Submitted', adminEmailText);

        res.status(201).json({ message: 'Review submitted successfully.' });
    } catch (error) {
        console.error('Error submitting review:', error.message);
        res.status(500).json({ error: 'An error occurred while submitting the review.' });
    }
};
