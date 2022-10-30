const phoneS = require("../../models/phone");
const verifPhone = require("../../helper/smsverif");
const accountSid = "ACad0696755cd0669e8c4165a1e8a6bdec";
const authToken = "74940f0d26f25e42b5a3175f3485c186";
const client = require("twilio")(accountSid, authToken);
const userModel = require("../../models/user");
const emailVerif = require("../../helper/emailVerifycation");
const moment = require("moment");
const whatsappVerif = require("../../helper/whatsappverif");

class PhoneController {
	static async regisPhone(req, res) {
		const codeOtpConfirm = Math.floor(Math.random() * 1000000);
		const convertString = codeOtpConfirm.toString();
		const slicCode = convertString.slice(0, 4);
		console.log(slicCode);
		const { phone, password } = req.body;
		const idn = '+62'
		const phonecode = idn+phone
		console.log(phonecode);
		const userRegis = await new phoneS({
			phone: phonecode,
			password,
			codeOtp: slicCode,
			typeNumber: 'Phone'
		});
		console.log(userRegis.phone);
		if (!userRegis) {
			res.status(500).json({ message: "server error" });
		} else {
			setTimeout(function () {
				verifPhone(phonecode, slicCode);
			}, 5000);
			res.status(200).json({ message: "success code terkirim" });
		}
	} 
	static async registerEmail(req, res) {
		const code = Math.floor(Math.random() * 10000);
		const { email, password, name, alamat, tanggalLahir, numberphone } =
			req.body;
		console.log("registerEmail", email, password, name, alamat);
		const createUser = await new userModel({
			email: email,
			password,
			name: name,
			alamat: alamat,
			tanggalLahir: moment(tanggalLahir).format("LL"),
			numberphone,
		});
		console.log(createUser);
		const sendemail = await emailVerif(email, name, code);
		if (sendemail) {
			console.log("success send email", sendemail(email, name, code));
		} else {
			console.log("error send email");
		}
		const save = await createUser.save();
		console.log(createUser);
		res
			.status(200)
			.json({
				message: "Success",
				data: createUser,
				email: "success send code ke email anda",
			});
		console.log(await save, "success");
	}
	static async regisWhatsapp(req, res) {
		const codeOtp = Math.floor(Math.random() * 1000000);
		const toStrin = codeOtp.toString();
		const codeSend = toStrin.slice(0, 4);
		const { phone, password } = req.body;
		const dataSave = await new phoneS({
			phone: phone,
			password,
			codeOtp: codeSend,
			typeNumber: 'WA'
		});
		console.log(dataSave);
		if (!dataSave) {
			res.status(400).json({ message: "regis error" });
		} else {
			const codeVerif = whatsappVerif(codeSend, phone);
			console.log(codeVerif, 'whatsappVerif');
			dataSave.save()
			if (codeVerif) return res.status(200).json({ message: "success" });
		}
	} 

	static async loginNumberPhone(req, res) {
		const {phone, password} = req.body;
		const data = await phoneS.findOne({phone: phone})
		if(data.phone === phone && data.password === password){
			res.status(200).json({ message: "success login"}); 
		}else{
			res.status(404).json({ message: "not found",})
			
		}
	}
}
module.exports = PhoneController;
 