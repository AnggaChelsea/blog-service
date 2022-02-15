const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const inboxSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    lastMessage: {
        type: Date,
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
    }
})