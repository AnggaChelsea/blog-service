const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSChema = Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    seller:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    buyyerId:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    messages: {
        type: String,
    },
    image:{
        type: String,
    },
    seen: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
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