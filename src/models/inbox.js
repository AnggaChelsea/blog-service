const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const inboxSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    reciveId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    message: {
        type: String,
        required: true,
    },
    lastMessage: {
        type: Date,
        default: Date.now,
    },
    seen: {
        type: Boolean,
        default: false,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    inboxHash: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
const inboxChat = mongoose.model('inboxs', inboxSchema);
module.exports = inboxChat;