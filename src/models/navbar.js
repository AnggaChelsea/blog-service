const mongoose = require("mongoose");
const schema = mongoose.Schema;

const navbarSchema = new schema({
	namaMenu: {
		type: String,
	},
	subMenu: {
		type: String,
	},
	link: {
		type: Number,
	},
	icon: {
		type: String
	}
});
const expnavbarSchema = mongoose.model("navbar", navbarSchema);
module.exports = expnavbarSchema;
