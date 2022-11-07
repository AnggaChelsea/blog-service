const mongoose = require("mongoose");
const schema = mongoose.Schema;
const SuratSchema = mongoose.Schema({
  name: {
    type: String,
    default: 'User'
    // required: false,
  }, 
  email: {
    type: String,
    required: true,
  },
  isCaptain: {
    type: Boolean,
    default: false,
  },
 
  namaTeam: {
    type: schema.Types.ObjectId,
    ref: 'namaTeam',
  },
  image: { 
    type: String,
  },
  jabatan:{

  },
 
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

  tanggalLahir: {
    type: String,
    required: true,
  },
  typeRole: {
    type: Number,
    default:2
  },
  numberphone: {
    type: String,
    maxlength: 12,
    required: false,
  },
  phone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'numberphone',
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
const suratModel = mongoose.model("users", SuratSchema);
//validate email

module.exports = suratModel;