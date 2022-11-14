const mongoose = require('mongoose')
const schema = mongoose.Schema

const menuSchema = new schema({
    state: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    typeMenu: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
})

const menu = mongoose.model('menu', menuSchema)
module.exports = menu