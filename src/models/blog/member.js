const mongoose = require('mongoose');
const schema = mongoose.Schema;

const memberSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'member'
    },
    codeOtp: {
        type: Number
    }
})

// memberSchema.virtual('id').get(() => {
//     return this._id.toHexString()
// });

// memberSchema.set('toJSON', {
//     virtuals: true,
// });
const member = mongoose.model('member', memberSchema)

// member.schema.path('email').validate((value)=> {
//     return member.findOne({
//         email: value
//     }).then((user) => {
//         if(user){
//             return false
//         }
//         return true
//     })
// }, "Email sudah terdaftar");

module.exports = member