
const transport = require('../config/nodemailer');
const SendConfirmation = (senderEmail, email, confirmations) => {
    console.log('check');
    transport.sendMail({
        from: senderEmail,
        to: email,
        subject: "Confirmation Email",
       
    });
}

module.exports = SendConfirmation; 