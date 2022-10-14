const accountSid = 'ACad0696755cd0669e8c4165a1e8a6bdec'; 
const authToken = '74940f0d26f25e42b5a3175f3485c186'; 
const client = require('twilio')(accountSid, authToken);

const verif = (toJuan, kodeOtp) => {
    client.messages 
          .create({ 
             body: `hallo terimakasih sudah mendaptar Di OSI mohon verifikasi kode otp ${kodeOtp}`,  
             messagingServiceSid: 'MG7e3479ba6b97b8b6bb4915d72158e8fa',      
             to: toJuan 
           }) 
          .then(message => console.log(message.sid)) 
          .done();
}

module.exports = verif;