const mongoose = require('mongoose');
const schema = mongoose.Schema

const schemaStatus = new schema({
    pemainId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "users",
    },
    gambar: [{
        type: String,
    }],
    status: {
        type: String,
        required: true,
    }
})
const dataStatus = mongoose.model('status', schemaStatus)
module.exports = dataStatus