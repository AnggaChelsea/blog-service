const phoneS = require("../../models/phone");
const verifPhone = require("../../helper/smsverif");
const accountSid = "ACad0696755cd0669e8c4165a1e8a6bdec";
const authToken = "74940f0d26f25e42b5a3175f3485c186";
const client = require("twilio")(accountSid, authToken);
const userModel = require("../../models/user");
const emailVerif = require("../../helper/emailVerifycation")
const moment = require("moment");

class PhoneController {
	static async regisPhone(req, res) {
		const codeOtpConfirm = Math.floor(Math.random() * 1000000);
		const { phone, password } = req.body;
		const userRegis = await new phoneS({
			phone,
			password,
			codeOtp: codeOtpConfirm,
		});
		console.log(phone);
		if (!userRegis) {
			res.status(500).json({ message: "server error" });
		} else {
			setTimeout(function () {
				verifPhone(phone, codeOtpConfirm);
			}, 5000);
			res
				.status(200)
				.json({ message: "success code terkirim", data: userRegis });
		}
	}
	static async registerEmail(req, res) {
        const code = Math.floor(Math.random() * 10000);
		const { email, password, name, alamat, tanggalLahir, numberphone } = req.body;
		console.log("registerEmail", email, password, name, alamat); 
		const createUser = await new userModel({
			email: email.toLowerCase(),
			password,
			name: name.toUpperCase(),
			alamat: alamat.toUpperCase(),
			tanggalLahir:moment(tanggalLahir).format('LL'),
			numberphone
		});
		console.log(createUser);
        const sendemail = await emailVerif(email, name, code  )
        if(sendemail){
            console.log('success send email', sendemail(email, name, code))
        }else{
            console.log('error send email')
        }
		const save = await createUser.save();
		console.log(createUser);
		res.status(200).json({ message: "Success", data: createUser, email: 'success send code ke email anda' });
		console.log(await save, "success");
	}
}
module.exports = PhoneController;
