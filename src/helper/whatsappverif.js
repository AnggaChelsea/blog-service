require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const whatsappVerify = (codeOtp, ToWhatsapp) => {
    client.messages
    .create({
       messagingServiceSid: "MG7e3479ba6b97b8b6bb4915d72158e8fa",
       body: `Hello Terimakasih sudah mendaptar di osi, berikut kode verifikasi! ${codeOtp}`,
       to: `+62${ToWhatsapp}`
     })
    //  console.log(to, 'tujuan')
    .then(message => console.log(message.sid));

    
// client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
// .verifications
// .create({to: '+15017122661', channel: 'whatsapp'})
// .then(verification => console.log(verification.accountSid));
}

module.exports = whatsappVerify