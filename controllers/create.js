var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const mysql = require("mysql2");
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "VTlabs",
    password: "samsung20021210"
});

// возвращаем форму для добавления данных
router.get("/", function(req, res) {
    res.render("create.hbs");
});
// получаем отправленные данные и добавляем их в БД 
router.post("/", urlencodedParser, function(req, res) {

    if (!req.body) return res.sendStatus(400);
    const bookname = req.body.bookname;
    const author = req.body.author;
    const abstractname = req.body.abstractname;
    const isbn = req.body.isbn;
    const review = req.body.review;
    pool.query("INSERT INTO library_table (bookname,author,abstractname,isbn,review) VALUES (?,?,?,?,?)", [bookname, author, abstractname, isbn, review], function(err, data) {
        if (err) return console.log(err);
        res.redirect("../");
    });
});
module.exports = router;