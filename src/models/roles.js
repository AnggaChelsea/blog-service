const mongoose = require('mongoose');


const rolesSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'user',
    },
})

const roles = mongoose.model('roles', rolesSchema)
roles.schema.path('name').validate(function (value) {
return roles.findOne({ name: value }).then(function (roles) {
    if (roles) {
        return false;
    }
    return true;
});
}, 'Role is already exist');

module.exports = roles;