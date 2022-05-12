const { createTransport } = require('nodemailer');
module.exports = async (options) => {
    const transportor = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
    const mailOptions = {
        form: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transportor.sendMail(mailOptions);
}