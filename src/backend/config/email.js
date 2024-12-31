const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
    debug: true,  // Detailed logs
    logger: true, // SMTP transaction logs
});

const sendEmail = async (to, subject, html) => {
    try {
        console.log('Sending email to:', to);
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to,
            subject,
            html,
        });
        console.log(`Email successfully sent to ${to}`);
    } catch (error) {
        console.error('Email sending failed:', error);
    }
};

module.exports = sendEmail;
