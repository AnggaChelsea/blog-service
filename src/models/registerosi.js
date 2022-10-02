const mongoose = require('mongoose')
const schema = mongoose.schema

const userRegistration = mongoose.Schema({
    // namaLengkap: '',
    // tanggalLahir: '',
    // jenisKelamin: '',
    // email: '',
    // noHp: '',
    // password: '',
    namaLengkap: {
        type:String,
        required:true,
    },
    tanggalLahir: {
        type:String,
        required:true,
    },
    jenisKelamin: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    noHp: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    }
})

const userRegis = mongoose.model('userosi', userRegistration);
module.exports = userRegis;