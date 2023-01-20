const lapangModel = require("../../models/lapang/lapang");
const katagoryModel = require("../../models/lapang/katagory-lapang");
const pemainModel = require("../../models/users/user");

class LapangController {
	static async CreateLapang(req, res) {
		const {
			namaLapang,
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
			alamatLengkap,
			katagory,
			pemilikId,  
			jadwal,
			type
		} = req.body;
		const newData = await new lapangModel({
			namaLapang,
			hargaSewaPerjam,
			gambar,
			lokasi,
			alamatLengkap,
			hargaSewaPerjam,
			rate,
			video,
			latitude,
			longitude,
			description,
			turnament,
			members,
			katagory,
			pemilikId,
			jadwal,
			type
		});
		// console.log(newData.pemilikId);
		newData
			.save()
			.then((newdatasuccess) => {
				res.status(200).json({message: 'success', data: newData});
			})
			.catch((err) => {
				res.status(500).json({ message: err });
			});
	}

	static async addrat(req, res) {
		const numb = 1;
		const idLapang = req.body
		const numbrate = await lapangModel.findOneAndReplace(idLapang, {
			rate: parseFloat(rate) + 1
		}, {
			new: true,
			useFindAndModify: false
		})
		
		if(numbrate){
			res.status(200).json({message: 'makasih', data: numbrate})
		}else{
			res.status(400).json({message:'error'})
		}
		
	}

	static async getLapang(req, res) {
		const lapangdata = await lapangModel
			.find()
			// .populate("katagory")
			.populate("members")
			.populate("pemilikId");

		if (!lapangdata) {
			res.status(404).json({ message: "not found" });
		} else {
			res.status(200).json({ message: "success", data: lapangdata });
		}
	}

	static async getLapangByPemilik(req, res) {
		const { pemilikId } = req.body;
		let lapang = await lapangModel.findOne({ pemilikId: pemilikId }).populate('pemilikId')
		if (lapang === null) {
			res.status(404).send({ message: "Belum Register Lapang" });
		} else {
			res.status(200).send({ message: "success get data", data: lapang });
		}
	}

	static async getLapangByKatagori(req, res) {
		const { katagory } = req.body;
		let lapangKate = await lapangModel.findOne({ katagory: katagory });
		if (lapangKate === null) {
			res.status(404).send({ message: "Belum Register Lapang" });
		} else {
			res.status(200).send({ message: "success get data", data: lapangKate });
		}
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
				res.status(200).json({
					message: "success creating katagory",
					data: data,
					dataKategori,
				});
			})
			.catch((err) => {
				res.status(500).json({ message: "error creating katag" });
			});
	}
	static async joinMember(req, res) {
		// const lapangId = req.params;
		const { lapangId, pemainId, statusAcc } = req.body;
		const datapemain = await pemainModel.findOne({ pemainId: pemainId });
		if (datapemain != null) {
			const dataLapangUpdate = await pemainModel.findOneAndUpdate(
				lapangId,
				{
					$push: {
						pemainId: {
							pemainId,
							statusAcc,
						},
						
					},
				},

				{
					new: true,
				}
			);
			res
				.status(201)
				.json({ message: "success jadi memeber", data: dataLapangUpdate });
		} else {
			res.status(400).json({ message: "belum bisa jadi memeber" });
		}
	}
	static async getKategory(req, res) {
		const data = await katagoryModel.find();
		if (data != null) {
			res.status(200).json({ message: "success", data: data });
		} else {
			res.status(400).json({ message: "error" });
		}
	}
	static async filterLapangTerdekat(req, res){
		const { desa } = req.body;
		const alamatLapang = await lapangModel.findOne({desa: desa})
		.then(() => {
			res.status(200).json({ message:'success', data: alamatLapang})
		})
		.catch((err) => {
			res.status(500).json({ message: err.message})
		})
	}

	static async filterLapang(req, res){
		const {type} = req.body
		const typeData = await lapangModel.findOne({type: type})
		.then(() => {
			res.status(200).json({ message: 'success', data: typeData})
		}).catch((err) => {
			res.status(500).json({ message: err.message})
		});
	}
}

module.exports = LapangController;
