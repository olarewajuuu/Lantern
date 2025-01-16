const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, message) => {
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
        to: email,
        subject,
        text: message,
    };
    await transporter.sendMail(mailOptions);
};


module.exports = sendEmail;