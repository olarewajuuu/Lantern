const Newsletter = require('../models/Newsletter');
const sendEmail = require('../utils/sendEmail');

exports.submitNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate the email field
        if (!email) {
            console.error('Email is missing in the request body');
            return res.status(400).json({ error: 'Email is required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error('Invalid email format');
            return res.status(400).json({ error: 'Please provide a valid email address' });
        }

        // Save to database (MongoDB or other DB)
        const newSubscriber = new Newsletter({ email });
        await newSubscriber.save();

        // Send confirmation email to the user
        const from = process.env.SUBSCRIBE_EMAIL;
        const subject = 'Welcome to Lantern Academy Newsletter';
        const message = `
            Thank you for subscribing to Lantern Academy's newsletter!
            You've successfully subscribed to our updates.
            Your email: ${email}
        `;

        // Send notification email to the admin
        const adminSubject = 'New Newsletter Subscription';
        const adminMessage = `A new subscription has been added. Email: ${email}`;

        await sendEmail(email, subject, message, from); // Send confirmation email to the user
        await sendEmail('Lanternacademyreg@gmail.com', adminSubject, adminMessage, from); // Notify the admin

        res.status(200).json({ message: 'Subscription submitted successfully.' });
    } catch (error) {
        console.error('Error submitting subscription:', error.message);
        res.status(500).json({ error: 'An error occurred submitting subscription' });
    }
};
