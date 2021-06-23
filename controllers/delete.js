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

// получаем Id удаляемой книги и удаляем её из бд
router.post("/:id", function(req, res) {

    const id = req.params.id;
    pool.query("DELETE FROM library_table WHERE id=?", [id], function(err, data) {
        if (err) return console.log(err);
        res.redirect("../");
    });
});
module.exports = router;