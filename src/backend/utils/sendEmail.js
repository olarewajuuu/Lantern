// const nodemailer = require('nodemailer');

// const sendEmail = async (to, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: process.env.EMAIL_PORT,
//             secure: process.env.EMAIL_PORT == 465, // SSL
//             auth: {
//                 user: process.env.EMAIL_USERNAME,
//                 pass: process.env.EMAIL_PASSWORD,
//             },
//             debug: true,  // Detailed logs
//             logger: true, // SMTP transaction logs
//         });
//         const mailOptions = {
//             from: process.env.EMAIL_USERNAME,
//             to,
//             subject,
//             text,
//         };
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully to:', to);
//     } catch (error) {
//         console.error('Error sending email:', error.message);
//         throw new Error('Failed to send email');
//     } 
// };


// module.exports = sendEmail;
const nodemailer = require('nodemailer');

async function sendEmail(to, subject, message, from) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_PORT == 465, // SSL
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
            debug: true,  // Detailed logs
            logger: true, // SMTP transaction logs
    });

    const mailOptions = {
        from,
        to,
        subject,
        text: message,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
