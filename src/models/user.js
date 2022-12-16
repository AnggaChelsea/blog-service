const mongoose = require("mongoose");
const schema = mongoose.Schema;
const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		isCaptain: {
			type: Boolean,
			default: false,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		password: {
			type: String,
			required: true,
		},
		namaTeam: {
			type: schema.Types.ObjectId,
			ref: "namaTeam",
		},
		image: {
			type: String,
			default:null,
		},
		followers: [
			{
				userId: {
					type: schema.Types.ObjectId,
					ref: "users",
				},
			},
		],
		alamat: {
			type: String,
			default:null,
		},
		PesanKirim: [
			{
				userId: {
					type: schema.Types.ObjectId,
					ref: "users",
				},
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		
		pesanTerima: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
			},
		],
		coordinateLocation: [
			{
				latitude: {
					type: String,
					default:null,
				},
				longitude: {
					type: String,
					default:null,
				},
			},
		],
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
			default: 2,
		},
		jenisKelamin: {
			type: String,
			default: null,
		},
		numberphone: {
			type: String,
			maxlength: 12,
			required: false,
		},
		// kategori: {
		// 	type: mongoose.Schema.ObjectId,
		// 	ref: "category-lapangs",
		// 	required: true,
		// },
		phone: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "numberphone",
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
		type: {
			type: mongoose.Schema.ObjectId,
			ref: "category-lapangs",
		},
		typeUser: { 
			type: String,
			required: true,
		},
		tinggiBadan: {
			type: Number,
			default: 0,
		},
		beratBadan: { 
			type: Number,
			default: 0,
		},
		typeLogin: {
			type: String,
			required: true,
		}

	},
	{
		collection: "",
	}
);

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
