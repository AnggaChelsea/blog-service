// const phoneS = require("../../models/phone");
// const verifPhone = require("../../helper/smsverif");
// const accountSid = "ACad0696755cd0669e8c4165a1e8a6bdec";
// const authToken = "74940f0d26f25e42b5a3175f3485c186";
// const client = require("twilio")(accountSid, authToken);
const userModel = require("../../models/user");
const emailVerif = require("../../helper/emailVerifycation");
const moment = require("moment");
const whatsappVerif = require("../../helper/whatsappverif");
const bcrypt = require("bcrypt");

class PhoneController {
	// static async regisPhone(req, res) {
	// 	const codeOtpConfirm = Math.floor(Math.random() * 1000000);
	// 	const convertString = codeOtpConfirm.toString();
	// 	const slicCode = convertString.slice(0, 4);
	// 	console.log(slicCode);
	// 	const { phone, password } = req.body;
	// 	const idn = '+62'
	// 	const phonecode = idn+phone
	// 	console.log(phonecode);
	// 	const userRegis = await new phoneS({
	// 		phone: phonecode,
	// 		password,
	// 		codeOtp: slicCode,
	// 		typeNumber: 'Phone'
	// 	});
	// 	console.log(userRegis.phone);
	// 	if (!userRegis) {
	// 		res.status(500).json({ message: "server error" });
	// 	} else {
	// 		setTimeout(function () {
	// 			verifPhone(phonecode, slicCode);
	// 		}, 5000);
	// 		res.status(200).json({ message: "success code terkirim" });
	// 	}
	// }
	static async registerEmail(req, res) {
		const salt = bcrypt.genSaltSync(10);
		const code = Math.floor(Math.random() * 1000000000);
		const slicesCode = code.toString().slice(0, 4);
		console.log(slicesCode);
		const {
			email,
			password,
			name,
			alamat,
			image,
			tanggalLahir,
			pemain,
			numberphone,
			jenisKelamin,
			typeUser,
			beratBadan,
			tinggiBadan,
			typeLogin,
			codeOtp,
		} = req.body;
		console.log("registerEmail", email, password, name, alamat);
		const createUser = await new userModel({
			email: email,
			password: bcrypt.hashSync(password, salt),
			name: name,
			alamat: alamat,
			tanggalLahir,
			numberphone,
			jenisKelamin,
			image,
			pemain,
			typeUser,
			codeOtp: slicesCode,
			beratBadan,
			tinggiBadan,
			typeLogin,
		});
		console.log(createUser);
		console.log(code, "otp");
		const sendemail = await emailVerif(email, name, slicesCode);
		console.log(sendemail, "console email");
		if (sendemail) {
			console.log("success send email", sendemail(email, name, slicesCode));
		} else {
			console.log("error send email");
		}
		const save = await createUser.save();
		console.log(createUser);
		res.status(200).json({
			message: "Success",
			data: {
				name: createUser.name,
				email: createUser.email,
				typeUser: createUser.typeUser,
			},
			email: "success send code ke email anda",
		});
		console.log(await save, "success");
	}

	static async loginNumberPhone(req, res) {
		const { phone, password } = req.body;
		const data = await phoneS.findOne({ phone: phone });
		if (data.phone === phone && data.password === password) {
			res.status(200).json({ message: "success login" });
		} else {
			res.status(404).json({ message: "not found" });
		}
	}
}
module.exports = PhoneController;
