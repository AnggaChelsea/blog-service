const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')
const blogVerif = (to, from, subject, text) => {
    const msg = {
      to: to, // Change to your recipient
      from: from, // Change to your verified sender
      subject: subject,
      text: text,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)    
      })
}

module.exports = blogVerif