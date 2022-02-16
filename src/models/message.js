const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSChema = Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "users",

    },
    message:{
        type: String,
        required: true,
    },
    file:{
        type: String,
        default: "",
    },
    meta:{
        type: String,
        default: "",
    },
    deleteUserId:{
        
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