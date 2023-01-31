const mongoose = require("mongoose");
const schema = mongoose.Schema;
const LapangSchema = new mongoose.Schema({
	namaLapang: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},

	jadwal: [
		{
			jadwalHari: {
				type: String,
			},
			jadwalJam: [],
			libur: {
				type: Boolean,
				default: false,
			},
		},
	],
	pemilikId: {
		type: schema.Types.ObjectId,
		ref: "users",
		required: true,
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
			gambar1: {
				type: String,
			},
			gambar2: {
				type: String,
			},
			video: {
				type: String,
			},
		},
	],
	video: {
		type: String,
	},
	alamatLengkap: {
		type: String,
		required: true,
	},
	provinsi: {
		type: String,
		required: true,
	},
	kota: {
		type: String,
		required: true,
	},
	kecamatan: {
		type: String,
		required: true,
	},
	kelurahan: {
		type: String,
		required: true,
	},
	namaLengkap: {
		type: String,
	},
	email: {
		type: String,
	},
	tlpn: {
		type: String,
	},
	kodePost: {
		type: String,
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
			},
		},
	],
	createdAt: {
		type: Date,
		default: new Date(),
	},
	type: {
		type: schema.Types.ObjectId,
		ref: "category-lapangs",
		required: true,
	},
});

const lapang = mongoose.model("lapang", LapangSchema);
module.exports = lapang;
