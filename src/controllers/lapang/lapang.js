const lapangModel = require("../../models/lapang/lapang");
const katagoryModel = require("../../models/lapang/katagory-lapang");

class LapangController {
	static async CreateLapang(req, res) {
		const {
			nama,
			hargaSewaPerjam,
			gambar,
			lokasi,
			rate,
			video,
			latitude,
			longitude,
			description,
			turnament,
			members,
		} = req.bddy;
		const newData = await new lapangModel({
			nama,
			hargaSewaPerjam,
			gambar,
			lokasi,
			rate,
			video,
			latitude,
			longitude,
			description,
			turnament,
			members,
		});
		newData
			.save()
			.then((newdatasuccess) => {
				if (newdatasuccess && newData) {
					res
						.status(201)
						.json({ message: "success create data", data: newdatasuccess });
				} else {
					res.status(400).json({ message: "error creating data" });
				}
			})
			.catch((err) => {
				res.status(500).json({ message: err });
			});
	}

	static async createCatagory(req, res) {
		const { nama, gambar } = req.body;
		const dataKategori = await new katagoryModel({
			nama,
			gambar,
		});
		dataKategori
			.save()
			.then((data) => {
				res
					.status(200)
					.json({
						message: "success creating katagory",
						data: data,
						dataKategori,
					});
			})
			.catch((err) => {
				res.status(500).json({ message: "error creating katag" });
			});
	}
}

module.exports = LapangController;
