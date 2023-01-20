const mongoose = require('mongoose');
const schema = mongoose.Schema;

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    }
});
const project = mongoose.model('projects', projectSchema);
module.exports = project