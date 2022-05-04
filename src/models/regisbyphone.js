const mongoose = require('mongoose');
const schema = mongoose.Schema;

const codeSchema = schema.create({
    code: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}
);
