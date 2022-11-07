const mongoose = require("mongoose");
const schema = mongoose.Schema;
const teamSchema = mongoose.Schema({
	nama: {
		type: String,
		required: true,
	},
	pemain: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "users",
            required: false,
		},
	],
	gambar: [],
    unixCode: {
        type: String,
    },
	statusOpen: {
		type: Boolean,
		default: true,
	},
	isActive: {
		type: Boolean,
		default: false,
	},
    // daerah: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "daerah",
	// },
	createdAt: {
		type: Date,
		default: new Date(),
	},
	kategori: {
		type: mongoose.Schema.ObjectId,
			ref: "category-lapangs",
            required: true,
	},
});

teamSchema.virtual("id", () => {
	return this._id.toHexString();
})

teamSchema.set("toJSON" , {
	virtual: true,
})

const teams = mongoose.model('Team', teamSchema);

teams.schema.path("nama").validate((value) => {
	return teams.findOne({
		nama: value
	}).then((value) => {
		if(value){
			return false;
		}
		return true;
	}, "Nama Team Sudah Ada")
})

module.exports = teams