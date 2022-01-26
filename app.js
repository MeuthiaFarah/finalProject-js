// Import express
const express = require("express");

// import router
const router = require("./routes/api");

// membuat object express
const app = express();

// definisikan port
app.listen(3001);

// mengubah data menjadi json
app.use(express.json());

// menggunakan router
app.use(router);