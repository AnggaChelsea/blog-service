const mongoose = require('mongoose');


const rolesSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'user',
    },
})
const roles = mongoose.model('roles', rolesSchema);
module.exports = roles;