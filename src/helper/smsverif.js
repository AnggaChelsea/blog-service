const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const verif = (toJuan, kodeOtp) => {
	client.messages
		.create({
			messagingServiceSid: "MG7e3479ba6b97b8b6bb4915d72158e8fa",
			body: `selamat register anda berhasil, berikut kode otp ${kodeOtp}`,
			to: toJuan,
		})
		.then((message) => console.log(message.sid))
		.done();
};

module.exports = verif;
