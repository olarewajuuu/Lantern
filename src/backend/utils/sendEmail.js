const nodemailer = require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
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
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    } 
};


module.exports = sendEmail;