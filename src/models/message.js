const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSChema = Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    sellerId:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    buyerId:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    message: {
        type: String,
        required: true
    },
})

MessageSChema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MessageSChema.set('toJSON', {
    virtuals: true
});

const messageSchema = mongoose.model('messages', MessageSChema);
module.exports = messageSchema;