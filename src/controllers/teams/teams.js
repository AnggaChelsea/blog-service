const teamModel = require("../../models/team/team");

class TeamController {
	static async createTeam(req, res) {
		const unixCodeTeam = Math.floor(Math.random() * 1000);
		const {
			nama,
			pemain,
			jumlahTeam,
			statusOpen,
			isActive,
			unixCode,
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

		const team = await new teamModel({
			nama,
			pemain,
			jumlahTeam,
			statusOpen,
			isActive,
			unixCode: unixCodeTeam,
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
		const timedata = await teamModel.find().populate("pemain");
		if (!timedata) return;

		res.status(200).send({ message: "success get data", data: timedata });
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
}
module.exports = TeamController;
