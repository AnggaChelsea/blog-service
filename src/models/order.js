const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = Schema({
    productOrder: [{
        type: Schema.Types.ObjectId,
        ref:'orderitems',
        required:true,
    }],
    provinsi: {
        type: String,
        required: true
    },
    kabupaten: {
        type: String,
        required: true
    },
    kecamatan: {
        type: String,
        required: true
    },
    desa: {
        type: String,
        required: true
    },
    alamatSesuaiKTP: {
        type: String,
        required: true
    },
    kodePos: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        maxlength: 12,
        minlength: 11,
        required: true
    },
    totalPrice: {
        type: Number,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    dateOrderd: {
        type: Date,
        default: Date.now,
    },

})
orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
orderSchema.set('toJSON', {
    virtuals: true
});
const orderModel = mongoose.model('orders', orderSchema);
module.exports = orderModel;