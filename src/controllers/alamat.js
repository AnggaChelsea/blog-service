const sqlConfig = require("../config/db_sql_connect");

class alamatController {
	static async getProv(req, res) {
		if (sqlConfig) {
			console.log("connected sql");
			const coba = sqlConfig("SELECT * FROM wilayah_provinsi");
			if(coba){
				// console.log("coba success", coba)
			}
		} else { 
			// console.log("not connected sql");
		}
	}
}

module.exports = alamatController;
