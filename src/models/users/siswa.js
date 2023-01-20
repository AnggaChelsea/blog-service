const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dataSchema = new schema({
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    kelas: {
        type: String,
        required: true,
    },
    jenisKelamin: {
        type: String,
        required: true,
    },
    kelas: {
        type: String,
        required: true,
    },
    namaSekolah: {
        type: String,
        required: true,
        trim: true,
    }
});

const exportvariable = mongoose.model('siswa', dataSchema);
module.exports = exportvariable