// import database
const database = require("../config/database");

// create class model Patient
class PatientModel {
	/**
	 * method query get all resource
	 * @returns mengembalikan seluruh data pasien dari database
	 */
	static all() {
		return new Promise((resolve, reject) => {
			// select all data from database
			const sql = "SELECT * FROM patients";
			database.query(sql, (err, result) => {
				resolve(result);
			});
		});
	}

	/**
	 * method query get data by id
	 * @param {number} id 
	 * @returns mengembalikan data pasien dengan id tertentu
	 */
	static find(id) {
		return new Promise((resolve, reject) => {
			const sql = "SELECT * FROM patients WHERE id = ?";
			database.query(sql, id, (err, result) => {
				// destructing array
				const [ patient ] = result;
				resolve(patient);
			});
		});
	}

	/**
	 * method create new resource
	 * menerima parameter berupa json dari controller
	 * @param {json} data 
	 * @returns mengembalikan data pasien yang baru dibuat
	 */
	static async create(data) {
		const id = await new Promise((resolve, reject) => {
			// insert data to database
			const sql = "INSERT INTO patients SET ?";
			database.query(sql, data, (err, result) => {
				resolve(result.insertId);
			});
		});

		// select data by id from method find
		return this.find(id);
	}

	/**
	 * method update resource
	 * menerima parameter id pasien dan data json dari controller 
	 * @param {number} id 
	 * @param {json} data 
	 * @returns mengembalikan data pasien id tertentu yang sudah di update
	 */
	static async update(id, data) {
		await new Promise((resolve, reject) => {
			// update data by id
			const sql = "UPDATE patients SET ? WHERE id = ?";
			database.query(sql, [ data, id ], (err, result) => {
				resolve(result);
			});
		});

		// select data by id from method find
		return this.find(id);
	}

	/**
	 * method delete resource by id
	 * @param {number} id 
	 */
	static async delete(id) {
		await new Promise((resolve, reject) => {
			const sql = "DELETE FROM patients WHERE id = ?";
			database.query(sql, id, (err, result) => {
				resolve(result);
			});
		});
	};

	/**
	 * method search resource
	 * menerima parameter string dari controller
	 * @param {string} name 
	 * @returns mengembalikan data pasien yang sesuai dengan parameter
	 */
	static search(name) {
		return new Promise((resolve, reject) => {
			const sql = "SELECT * FROM patients WHERE name LIKE '%' ? '%'";
			database.query(sql, name, (err, result) => {
				resolve(result);
			});
		});
	};

	/**
	 * method findById
	 * menerima parameter dari controller berupa status pasien
	 * @param {string} status 
	 * @returns mengembalikan data pasien berdasarkaan status
	 */
	static findByStatus(status) {
		return new Promise((resolve, reject) => {
			const sql = "SELECT * FROM patients WHERE status = ?";
			database.query(sql, status, (err, result) => {
				resolve(result);
			});
		});
	};
}

// export class
module.exports = PatientModel;
