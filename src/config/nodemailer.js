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

module.exports = transport