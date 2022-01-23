const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({

    name: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'avatar.png'
    },

    alamat: {
        type: String,
        default: ''
    },

    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'roles',
        required: true,
    },

    numberphone: {
        type: String,
        maxlength: 12,
        minlength: 11,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true
});
const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;