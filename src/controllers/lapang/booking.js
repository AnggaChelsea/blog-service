const bookingModel = require("../../models/lapang/booking");

class BookingController {
	static async doBooking(req, res) {
		const {
			idLapang,
			idPemain,
			tanggalBooking,
			jamBooking,
			durasiMain,
			totalBayar,
		} = req.body;
		const dataLapang = await new bookingModel({
			idLapang,
			idPemain,
			tanggalBooking,
			jamBooking,
			durasiMain,
			totalBayar,
		}); 
		// console.log(dataLapang);
		dataLapang.save()
        .then(() => {
			res
				.status(200)
				.json({ message: "success", data: dataLapang })
		}).catch((err) => {
            res.status(500).json({ message: "message", data: err });
        });;
	}
}

module.exports = BookingController;
