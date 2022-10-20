
const transport = require('../config/nodemailer');
const SendConfirmation = (email, name, confirmations) => {
    console.log('check');
    transport.sendMail({
        from: "adeadeaja2121@gmail.com",
        to: email,
        subject: "Confirmation Email",
        html: `
        <strong style="color:blue">Hi ${name}!</strong> <br />terimakasih sudah mendaftar di ourCommerce. <br />
         
        <p>${confirmations}</p>`
       
    });
}

module.exports = SendConfirmation; 