
const transport = require('../config/nodemailer');
const sendVeryficationPassword = (senderEmail, email, confirmations) => {
    console.log('check');
    transport.sendMail({
        from: senderEmail,
        to: email,
        subject: "Confirmation change Password",
        html: `
        <strong>Berikut link untuk merubah password:</strong>
        <p>${confirmations}</p>`
       
    });
}

module.exports = sendVeryficationPassword; 