const Subscribe = require('../models/Subscribe');
const sendEmail = require('../utils/sendEmail');


exports.submitSubscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Field is required' });
        }
        const from = process.env.SUBSCRIBE_EMAIL;
        const subject = 'Welcome to Lantern Academy Newsletter';
        const message = `Thank you for subscribing to our newsletter! You've successfully subscribed to our updates. Your email: ${email}`;
        

        // send notification email to Lantern Acadamy
        const adminEmailText = `A new subscription has been submitted: Email: ${email}`;
        await sendEmail('Lanternacademyreg@gmail.com', 'New Subscription', email, subject, message, from);

        res.status(201).json({ message: 'Subscription submitted successfully.' });
    } catch (error) {
        console.error('Error submitting subscription', error.message);
        res.status(500).json({ error: 'An error occurred submitting subscription'});
    }
};