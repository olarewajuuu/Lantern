const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
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
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to,
            subject,
            text,
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', to);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    } 
};


module.exports = sendEmail;