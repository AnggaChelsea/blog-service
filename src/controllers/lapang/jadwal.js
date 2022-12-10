const jadwalModel = require("../../models/lapang/jadwal");
class jadwalController {
	static async createJadwal(req, res) {
		const { jadwalHari, jadwalJam, libur } = req.body;
		const dataJadwal = await new jadwalModel({
			jadwalHari,
			jadwalJam,
			libur,
		})
        console.log(dataJadwal)
        dataJadwal.save()
        .then(() => {
            res.status(200).json({message:'success', data:dataJadwal})
        })
        .catch((err => {
            res.status(500).json({message:'error', err})
        }))
	}
    static async getJadwal(req, res) {
        const dataJadwal = await jadwalModel.find()
        if(dataJadwal){
            res.status(200).json({message:'success', data: dataJadwal})
        }else{
            res.status(500).json({message:'data jadwal kosong'})
        }
        
    }
}

module.exports = jadwalController
