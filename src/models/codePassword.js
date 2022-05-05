const mongoose = require('mongoose')
const schema = mongoose.Schema

const passwordCodeSchema = new schema({
    code: Number
})
const exportSchema = mongoose.model('passwordCode', passwordCodeSchema)
module.exports = exportSchema