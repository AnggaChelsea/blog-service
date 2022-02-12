const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSChema = Schema({
    message: {
        type: String,
        minlength: 1,
        required: true
    },
    uploadfile: {
        type: String,
    },
    from: {
        type: String,
        required: true
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