var express = require('express');
var router = express.Router();
const mysql = require("mysql2");
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "VTlabs",
    password: "samsung20021210"
});
// получение списка книг
router.get("/", function(req, res) {
    pool.query("SELECT * FROM library_table", function(err, data) {
        if (err) return console.log(err);
        res.render("index.hbs", {
            library_table: data
        });
    });
});
module.exports = router;