const lapangModel = require("../../models/lapang/lapang");
const katagoryModel = require("../../models/lapang/katagory-lapang");
const pemainModel = require("../../models/user");

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
			katagory,
			pemilikId
		} = req.body;
		const newData = await new lapangModel({
			nama: nama,
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
			katagory,
			pemilikId
		});
		console.log(newData.pemilikId);
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

	static async getLapang(req, res){
		const lapangdata = await lapangModel.find().populate('katagory').populate('members').populate('pemilikId')

		if(!lapangdata){
			res.status(404).json({ message:'not found' });
		}else{
			res.status(200).json({ message:'success', data:lapangdata})
		}
	}

	static async getLapangByPemilik(req, res){
		const {pemilikId} = req.body;
		let lapang = await lapangModel.findOne({pemilikId: pemilikId})
		if(lapang === null){
			res.status(404).send({message: 'Belum Register Lapang'})
		}else{
			res.status(200).send({message: 'success get data', data: lapang})
		}
		
	}

	static async getLapangByKatagori(req, res){
		const {katagory} = req.body;
		let lapangKate = await lapangModel.findOne({katagory: katagory})
		if(lapangKate === null){
			res.status(404).send({message: 'Belum Register Lapang'})
		}else{
			res.status(200).send({message: 'success get data', data: lapangKate})
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
	static async joinMember(req, res){
		const lapangId = req.params;
		const {pemainId} = req.body;
		const datapemain = await pemainModel.findOne({pemainId: pemainId});
		if(datapemain != null){
			const dataLapangUpdate = await pemainModel.findOneAndUpdate(lapangId, {
				$push: {pemainId: [pemainId]}
			}, 
			
			{
				new: true
			})
			res.status(201).json({message:'success jadi memeber', data: dataLapangUpdate})
		}else{
			res.status(400).json({message: 'belum bisa jadi memeber'})
		}
	}
	static async getKategory(req, res){
		const data = await katagoryModel.find()
		console.log(data)
		if(data != null){
			res.status(200).json({message: 'success', data: data})
		}else{
			res.status(400).json({message: 'error'})
		}
	}
}

module.exports = LapangController;
