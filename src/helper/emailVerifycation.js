
const transport = require('../config/nodemailer');
const SendConfirmation = (senderEmail, name, email, confirmations) => {
    console.log('check');
    transport.sendMail({
        from: senderEmail,
        to: email,
        subject: "Confirmation Email",
        html: `
        <strong style="color:blue">Hi ${name}!</strong> <br />terimakasih sudah mendaftar di ourCommerce. <br />
        
        <p>${confirmations}</p>`
       
    });
}

module.exports = SendConfirmation; 