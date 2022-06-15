const mongoose = require("mongoose");
const schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
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
  followers: [{
    userId: {
      type: schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  alamat: {
    type: String,
  },
  PesanKirim: [{
    userId: {
      type: schema.Types.ObjectId,
      ref: "users",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  pesanTerima: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  coordinateLocation: [{
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    }
  }],
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