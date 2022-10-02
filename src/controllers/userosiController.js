const userModel = require("../models/registerosi");

class OsiRegisterController {
	static async registerosi(req, res) {
		const { namaLengkap, tanggalLahir, jenisKelamin, email, noHp, password } =
			req.body;
		const userregis = new userModel({
			namaLengkap,
			tanggalLahir,
			jenisKelamin,
			email,
			noHp,
			password,
		});
		if (!userregis) {
			res.status(403).json({ message: "Invalid user registration format" });
		} else {
			res.status(200).json({ success: true, message: "Registration succes" });
		}
	}
}

module.exports = OsiRegisterController;
