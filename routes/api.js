//  import modules express
const express = require("express");

// import PatientController
const PatientController = require("../controllers/PatientController");

// membuat objek router
const router = express.Router();

// route awal
router.get("/", (req, res) => {
	const data = {
		message: `This is Final Project`,
		alert: `Selamat Berpusing Ria ╥_╥`,
	};
	res.json(data);
});

// router patients
router.get("/patients", PatientController.index); // route get all resource
router.post("/patients", PatientController.store); // route add resource
router.put("/patients/:id", PatientController.update); // route update resource
router.delete("/patients/:id", PatientController.destroy); // route delete resource
router.get("/patients/:id", PatientController.show); // route get one resource
router.get("/patients/search/:name", PatientController.search); // route search resource
router.get("/patients/status/positive", PatientController.positive); // route get positive resource
router.get("/patients/status/recovered", PatientController.recovered); // route get recovered resource
router.get("/patients/status/dead", PatientController.dead); // get dead resource

//export router
module.exports = router;
