const mongoose = require('mongoose')
const schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    idLapang: {
        type: schema.Types.ObjectId,
		ref: "lapangs",
    },
    idPemain:{
        type: schema.Types.ObjectId,
		ref: "users",
    },
    tanggalBooking:[{
        type:String,
        required: true,
    }],
    jamBooking: [{
        type:String,
        required: true,
    }],
    durasiMain:{

    },
    totalBayar: {
        type:Number,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    statusBayar: {
        type:Boolean,
        default: false
    }
})
const booking = mongoose.model('booking-lapangs', bookingSchema)
module.exports = booking