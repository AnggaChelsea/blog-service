const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'orderitems',
        required:true,
    }],
    shippingAddress: {
        type: String,
        required: true
    },
    shippingAddress2: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
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
        type: Schema.ObjectId,
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