const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    nama: {
        type: String,
    },
    gambar: {
        type: String,
    }
})
const category = mongoose.model('Category-lapang', categorySchema)
module.exports = category