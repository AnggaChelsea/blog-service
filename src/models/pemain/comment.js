const mongoose = require('mongoose');
const schema = mongoose.Schema

const schemaStatus = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "users",
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "status",
    },
    gambar: [{
        type: String,
    }],
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})
const dataStatus = mongoose.model('comment', schemaStatus)
module.exports = dataComment