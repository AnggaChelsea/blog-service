const teamModel = require("../../models/team/team");

class TeamController {
	static async createTeam(req, res) {
		const unixCodeTeam = Math.floor(Math.random() * 1000);
		const {
			nama,
			pemain,
			statusOpen,
			isActive,
			gambar,
			kategori
			// daerah,
		} = req.body;
		// const unixcodedata = await teamModel.find();
		// if (unixcodedata != null)
		// {
		//     await teamModel.find(pemain, {
		//         $push: {
		//             pemain: pemain
		//         }
		//     })
		// }
		const teamJumlah = await teamModel.find()
		if(teamJumlah != null){
			for(let i = 0; i < teamJumlah.length; i++){
				console.log(teamJumlah[i].pemain, 'jumlahTeam')
			}
		}
		const team = await new teamModel({
			nama,
			pemain,
			statusOpen,
			isActive,
			unixCode: unixCodeTeam,
			gambar,
			kategori
			// daerah,
		});

		team
			.save()
			.then((userteam) => {
				if (!userteam || !team) return;
				res
					.status(200)
					.send({ message: "Team created successfully", data: userteam });
			})
			.catch((err) => {
				return res.status(500).send({ message: err.message, data: err.data });
			});
	}

	static async getTeams(req, res) {
		let datapemain;
		const timedata = await teamModel.find().populate("pemain").populate("kategori");
		for(let i = 0; i < timedata.length; i++) {
			const coun =  timedata[i].pemain
			const lengPemain = coun.length
			datapemain = lengPemain
		}
		// console.log(datapemain, 'ini data pemain')
		if (!timedata) return;

		res.status(200).send({ message: "success get data", data: timedata, jumlahPemain: datapemain });
	}

	static async gabungTeam(req, res) {
		// const teamId = req.params;
		const { teamId, pemainId } = req.body;
		const teamdata = await teamModel.findByIdAndUpdate(teamId, {
			$push: {
				pemain: pemainId,
			},
			
		}, {
			safe: true, 
			upsert: true, 
		});
		if (!teamdata) return;
		res.status(200).send({ message: "success gabung", data: teamdata });
	}
	static async joinMemberTeam(req, res){
		const teamId = req.params;
		const {pemainId} = req.body;
		const datapemain = await teamModel.findOne({pemainId: pemainId});
		if(datapemain != null){
			const dataLapangUpdate = await teamModel.findOneAndUpdate(teamId, {
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
	
}
module.exports = TeamController;
