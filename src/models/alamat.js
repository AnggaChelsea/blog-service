const mongoose = require('mongoose')
const schema = mongoose.Schema;

const alamatSchema = new schema({
    kecamatan: [{
        type: String,
       
    }],
    kota: [{
        type: String,
       
    }],
    provinsi: [{
        type: String,
       
    }],
    kode_pos: [{
        type: String,
       
    }],
})
const expAlamatSchema = mongoose.model('alamat', alamatSchema)
module.exports = expAlamatSchema