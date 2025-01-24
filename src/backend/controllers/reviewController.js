const Review = require('../models/Review');
const sendEmail = require('../utils/sendEmail');

exports.submitReview = async (req, res) => {
    try {
        const { message } = req.body;

        // these validate user input
        if (!message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        // create and save the review data
        const review = new Review({ message }); 
        await review.save();

        // send notification
        const adminEmail = process.env.REVIEW_EMAIL;
        const subject = 'New Review Submitted';
        const text = `A new review has been submitted:\n\n${message}`;


        // Send notification email to Lantern Academy
        await sendEmail('Lanternacademyreg@gmail.com', 'New Review Submitted', adminEmail, subject, text);

        res.status(201).json({ message: 'Review submitted successfully.' });
    } catch (error) {
        console.error('Error submitting review:', error.message);
        res.status(500).json({ error: 'An error occurred while submitting the review.' });
    }
};
