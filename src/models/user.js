const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  followers: [],
  alamat: {
    type: String,
  },
  PesanKirim: [],
  pesanTerima: [],
  notification: [],
  codeOtp: {
    type: Number,
  },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
    default: "626b9b71e64b96457ff05e96",
  },

  numberphone: {
    type: String,
    maxlength: 12,
    required: false,
  },
  followers: [],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: "",
});

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set("toJSON", {
  virtuals: true,
});
const UserModel = mongoose.model("users", UserSchema);
//validate email
UserModel.schema.path("email").validate(function (value) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
});
// validate email is exist
UserModel.schema.path("email").validate(function (value) {
  return UserModel.findOne({
    email: value,
  }).then(function (user) {
    if (user) {
      return false;
    }
    return true;
  });
}, "Email sudah terdaftar");

UserModel.schema.path('username').validate(function (value) {
  return /^[a-zA-Z ]*$/.test(value);
}, 'username must be letters only');
UserModel.schema.path('username').validate(function (value) {
  return UserModel.findOne({
    username: value,
  }).then(function (user) {
    if (user) {
      return false;
    }
    return true;
  });
}, 'username sudah terdaftar');
// validate numberphone isexist
UserModel.schema.path("numberphone").validate(function (value) {
  return UserModel.findOne({
    numberphone: value,
  }).then((user) => {
    if (user) {
      return false;
    }
    return true;
  });
}, "Nomor telepon sudah terdaftar");
module.exports = UserModel;