
const transport = require('../config/nodemailer');
const SendConfirmation = (name, email, confirmations) => {
    console.log('check');
    transport.sendMail({
        from: "user",
        to: email,
        subject: "Confirmation Email",
        html: `<h1>Hello ${name}</h1>
        <p>Thank you for registering. Please click on the link below to complete your registration.</p>
        <a href="http://localhost:3000/user/confirmation/${confirmations}">Confirmation</a>`
    });
}

module.exports = SendConfirmation; 