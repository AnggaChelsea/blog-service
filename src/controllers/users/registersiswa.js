const modelUser = require("../models/users/siswa");

class SiswaController {
	static async registerSiswa(req, res) {
        try{
        }catch(e){
            let inputRegisterSiswa = req.body;

		//validate input register siswa
		if (
			!inputRegisterSiswa.username ||
			!inputRegisterSiswa.password ||
			!inputRegisterSiswa.email
		) {
			return res.status(400).json({
				message: "Invalid input register siswa",
			});
		}
        }
		//create input register siswa
		
       
	}
}
