const mongoose = require('mongoose');
const schema = mongoose.Schema
const phoneSchema = new schema({
    phone: {
        type: 'string',
        required: true,
        maxlength:12,
        minlength:11
    },
    password: {
        type: 'string',
        required: true,
    },
    codeOtp: {
        type: 'string',
    },
    typeNumber: {
        type: String,
    }
})
const createTable = mongoose.model('numberphone', phoneSchema)
module.exports = createTable