const mongoose = require('mongoose');
const schema = mongoose.Schema;

const serviceprojectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    linkVideo:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
});
const serviceproject = mongoose.model('serviceprojects', serviceprojectSchema);
module.exports = serviceproject