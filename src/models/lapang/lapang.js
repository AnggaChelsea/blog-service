const mongoose = require("mongoose");
const schema = mongoose.Schema;
const LapangSchema = new mongoose.Schema({
	nama: {
		type: String,
		required: true,
	},
	jadwal: [
		
	],
	pemilikId: {
		type: schema.Types.ObjectId,
		ref: "users",
	},
	hargaSewaPerjam: {
		type: String,
		required: true,
	},
	rate: {
		type: String,
		default: 0,
	},
	gambar: [
		{
			type: String,
			required: true,
		},
	],
	video: {
		type: String,
	},
	lokasi: {
		type: String,
		required: true,
	},
	latitude: {
		type: String,
	},
	longitude: {
		type: String,
	},
	description: {
		type: String,
	},
	turnament: {
		type: Boolean,
		default: false,
	},
	members: [
		{
			pemainId: {
				type: schema.Types.ObjectId,
				ref: "users",
				required: false,
			},
			statusAcc: {
				type: Boolean,
				default: false,
				required: false,
			}
		},
	],
	createdAt: {
		type: Date,
		default: new Date(),
	},
	katagory: {
		type: schema.Types.ObjectId,
		ref: "category-lapangs",
	},
});

const lapang = mongoose.model("lapang", LapangSchema);
module.exports = lapang;
