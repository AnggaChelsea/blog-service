const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type:Boolean,
        default: false
    },
    message:{
        type: String,
    }
}, {
    timestamps: true
});
const expTransaction = mongoose.model('transactions', transactionSchema);
module.exports = expTransaction;