const mongoose = require("mongoose");

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
	jumlahTeam: {
		type: Number,
		default: 0,
	},
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
	
});

const teams = mongoose.model('Team', teamSchema);
module.exports = teams