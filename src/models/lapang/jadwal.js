const mongoose = require('mongoose');
const schema = mongoose.Schema

const jadwalModel = new schema({
   jadwalHari: {
    type: String,
   },
   jadwalJam:[

   ],
   libur: {
    type: Boolean,
    default: false
   }
})

const jadwal = mongoose.model('jadwal', jadwalModel)
module.exports = jadwal;