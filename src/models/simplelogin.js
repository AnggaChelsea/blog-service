const mongoose = require('mongoose');
const schema = mongoose.Schema

const userSimpleSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true }

})

const simple = mongoose.model('simple', userSimpleSchema)
module.exports = simple