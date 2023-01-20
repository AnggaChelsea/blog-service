const mongoose = require('mongoose')

const hireSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    numberPhone: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true
    },
    message:{
        type:String,
        required: true
    }
})

const hire = mongoose.model('hiring', hireSchema)
module.exports = hire;