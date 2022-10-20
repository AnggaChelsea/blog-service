const nodemailer = require('nodemailer');
const confifemail = require('./emailconfig');

const user = confifemail.user
const pass = confifemail.pass

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user,
        pass
    }
})
transport.verify((err, success) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is ready to take our messages');
    }
} 
)

// let transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       type: 'OAuth2',
//       user: "adeadeaja2121@gmail.com",
//       pass: "Chlseajuara1",
//       clientId: "1049492722791-j07s9n8c23k4q41hi95b7lnun9vroalg.apps.googleusercontent.com",
//       clientSecret: "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",
//       refreshToken: "4/0AX4XfWg8I86H0vaWobxot5WeEL1PGhspKQtplIXTSx1KuWmx9O73w5al9m0poOS-hQsX-A"
//     }
//   });

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'mia.gusikowski38@ethereal.email',
//         pass: 'p9G3RwYqxQFvMWBhEt'
//     }
// });

module.exports = transport