const mongoose = require('mongoose');
const workSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})
const work = mongoose.model('workexperience', workSchema)
module.exports = work