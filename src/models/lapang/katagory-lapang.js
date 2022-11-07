const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    nama: {
        type: String,
    },
    gambar: {
        type: String,
    }
})
const category = mongoose.model('category-lapangs', categorySchema)
module.exports = category