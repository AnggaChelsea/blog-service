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
    image: String,
    countInStock: {
        type: Number,
        required: true
    },
    alamat:{
        type:String,
        default:''
    },
    numberphone:{
        type:Number,
        maxlength:12,
        minlength:11,
        default:0
    }
})

UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (_, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
exports.User = mongoose.model('users', userSchema);