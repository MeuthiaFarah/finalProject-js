// Import data from database
const patient = require("../models/PatientModel");

// membuat class PatientController
class PatientController {
	/**
	 * method get all resource
	 * @param {} req
	 * @param {kodeStatus, json} res
	 * @returns mengembalikan kode status dan data seluruh pasien didatabase/respon error
	 */
	async index(req, res) {
		// get all patients
		const patients = await patient.all();
		if (patients.length > 0) {
			const data = {
				message: `Get All Resource`,
				data: patients,
			};

			// return success response
			return res.status(200).json(data);
		}

		// else
		// send error response
		const data = {
			message: `Data is Empty`,
		};

		// return status code dan data json
		return res.status(204).json(data);
	}

	/**
	 * method create resource
	 * menerima request body berupa data json
	 * mengembalikan respon kode status dan data yang baru ditambahkan/ respon error
	 * @param {json} req
	 * @param {kodeStatus, json} res
	 */
	async store(req, res) {
		// menerima request berupa name, phone, address, status, in_date_at, dan out_date_at
		const { name, phone, address, status, in_date_at, out_date_at } = req.body;

		// manual authentication
		// definisikan pengecekan alfabet
		const alphabet = (char) => {
			!/[a-zA-Z]/.test(char);
		};

		// data must be filled in completely
		if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
			const data = {
				message: `Semua data harus dikirim`,
			};

			// send error response
			return res.status(422).json(data);
		}

		// validasi nama harus alfabet
		else if (alphabet(name)) {
			const data = {
				message: `Nama harus berupa alfabet`,
			};

			// send error response
			return res.status(422).json(data);
		}

		// validasi nomor telepon harus angka
		else if (isNaN(phone)) {
			const data = {
				message: `Nomor telepon harus berupa angka`,
			};

			// send error response
			return res.status(422).json(data);
		}

		// validasi address harus alfabet
		else if (alphabet(address)) {
			const data = {
				message: `Alamat harus berupa alfabet`,
			};

			// send error response
			return res.status(422).json(data);
		}

		// validasi status harus sesuai dengan aturan
		else if (!(status.toLowerCase() == 'positive' || status.toLowerCase() == 'recovered' || status.toLowerCase() == 'dead')) {
			const data = {
				message: `Status salah`,
			};

			// send error response
			return res.status(422).json(data);
		}

		// else
		// data added successfully
		const patients = await patient.create(req.body);
		const data = {
			message: `Resource Added Successfully`,
			data: patients,
		};

		return res.status(201).json(data);
	}

	/**
	 * method update resource
	 * menerima request parameter berupa id
	 * @param {number} req
	 * @param {kodeStatus, json} res
	 * @returns mengembalikan kode status beserta data yang telah di update/respon error
	 */
	async update(req, res) {
		// request parameter by id
		const { id } = req.params;

		// find patient by id
		const patients = await patient.find(id);
		if (patients) {
			// update data
			const patientUpdated = await patient.update(id, req.body);

			const data = {
				message: `Resource Updated Successfully`,
				data: patientUpdated,
			};

			return res.status(200).json(data);
		}

		// else
		// send error response
		const data = {
			message: `Resource Not Found`,
		};

		return res.status(404).json(data);
	}

	/**
	 * method delete resource
	 * menerima request parameter berupa id
	 * @param {number} req
	 * @param {kodeStatus, json} res
	 * @returns mengembalikan kode status dan pesan error/sukses
	 */
	async destroy(req, res) {
		// request parameter by id
		const { id } = req.params;

		// find patient by id
		const patients = await patient.find(id);
		if (patients) {
			// delete data
			await patient.delete(id);
			const data = {
				message: `Resource Deleted Successfully`,
			};

			// send success response
			return res.status(200).json(data);
		}

		// else
		// send error response
		const data = {
			message: `Data not found`,
		};

		return res.status(404).json(data);
	}

	/**
	 * methos show one resource
	 * menerima request parameter id
	 * @param {number} req
	 * @param {kodeStatus, json} res
	 * @returns mengembalikan kode status dan data berdasarkan id/respon error
	 */
	async show(req, res) {
		// request parameter by id
		const { id } = req.params;

		// get detail resource by id
		const patients = await patient.find(id);
		if (patients) {
			const data = {
				message: `Get Detail Resource`,
				data: patients,
			};

			// send success response
			return res.status(200).json(data);
		}

		// else
		// send error response
		const data = {
			message: `Resource Not Found`,
		};

		return res.status(404).json(data);
	}

	/**
	 * method search resource by name
	 * menerima request parameter berupa nama
	 * @param {string} req
	 * @param {kodeStatus, json} res
	 * @returns mengembalikan kode status dan data pasien/respon error
	 */
	async search(req, res) {
		// request parameter by name
		const { name } = req.params;

		// get resource by name
		const patients = await patient.search(name);
		if (patients) {
			const data = {
				message: `Get Searched Resource`,
				data: patients,
			};

			// send success response
			return res.status(200).json(data);
		}

		// else
		// send error response
		const data = {
			message: `Resource Not Found`,
		};

		return res.status(404).json(data);
	}

	/**
	 * method get positive resource
	 * menyeleksi data pasien dan mengembalikan data pasien dengan status positive
	 * @param {*} req
	 * @param {kodeStatus, json} res
	 */
	async positive(req, res) {
		const patients = await patient.findByStatus("positive");
		const total = patients.length;
		const data = {
			message: `Get Positive Resource`,
			total: total,
			data: patients,
		};

		// send success response
		res.status(200).json(data);
	}

	/**
	 * method get recovered resource
	 * menyeleksi data pasien dan mengembalikan data pasien dengan status recovered
	 * @param {*} req
	 * @param {kodeStatus, json} res
	 */
	async recovered(req, res) {
		const patients = await patient.findByStatus("recovered");
		const total = patients.length;
		const data = {
			message: `Get Recovered Resource`,
			total: total,
			data: patients,
		};

		// send success response
		res.status(200).json(data);
	}

	/**
	 * method get dead resource
	 * menyeleksi data pasien dan mengembalikan data pasien dengan status dead
	 * @param {*} req
	 * @param {kodeStatus, json} res
	 */
	async dead(req, res) {
		const patients = await patient.findByStatus("dead");
		const total = patients.length;
		const data = {
			message: `Get Dead Resource`,
			total: total,
			data: patients,
		};

		// send success response
		res.status(200).json(data);
	}
}

// create object class PatientController
const object = new PatientController();

// export file PatientController
module.exports = object;
