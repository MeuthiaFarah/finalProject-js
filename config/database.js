// import mysql
const mysql = require("mysql");

// import dotenv dan jalankan method config
require("dotenv").config();

// create method database connection
const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// create database connection dengan database.connect
database.connect((err) => {
    if (err) {
        console.log(`Error Connecting ${err}`);
        return;
    }
    else {
        console.log(`Connected to Database`);
        return;
    }
});

// export module database
module.exports = database;