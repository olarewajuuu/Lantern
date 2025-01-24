const Subscribe = require('../models/Subscribe');
const sendEmail = require('../utils/sendEmail');

exports.submitSubscribe = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email field
        if (!email) {
            return res.status(400).json({ error: 'Email field is required.' });
        }

        // Check if the email is already subscribed
        const existingSubscription = await Subscribe.findOne({ email });
        if (existingSubscription) {
            return res.status(400).json({ error: 'This email is already subscribed.' });
        }

        // Save the subscription to the database
        const subscription = new Subscribe({ email });
        await subscription.save();

        // Send a welcome email to the subscriber
        const from = process.env.SUBSCRIBE_EMAIL || 'no-reply@lanternacademy.com';
        const subject = 'Welcome to Lantern Academy Newsletter';
        const message = `
            Hi there,
            
            Thank you for subscribing to our newsletter! You've successfully subscribed to receive updates and news from Lantern Academy.
            
            Your email: ${email}

            Best regards,
            Lantern Academy
        `;

        await sendEmail(email, subject, message, from);

        // Send a notification email to Lantern Academy admin
        const adminEmail = 'Lanternacademyreg@gmail.com';
        const adminSubject = 'New Subscription';
        const adminMessage = `A new subscription has been submitted:\n\nEmail: ${email}`;

        await sendEmail(adminEmail, adminSubject, adminMessage, from);

        // Respond with success
        res.status(201).json({ message: 'Subscription submitted successfully. Please check your email for confirmation.' });
    } catch (error) {
        console.error('Error submitting subscription:', error.message);
        res.status(500).json({ error: 'An error occurred while submitting the subscription.' });
    }
};
