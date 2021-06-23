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

// получем Id редактируемой книги, получаем её из бд и отправлям с формой редактирования
router.get("/:id", function(req, res) {
    const id = req.params.id;
    pool.query("SELECT * FROM library_table WHERE id=?", [id], function(err, data) {
        if (err) return console.log(err);
        res.render("edit.hbs", {
            library_table: data[0]
        });
    });
});
// получаем отредактированные данные и отправляем их в БД
router.post("/", urlencodedParser, function(req, res) {

    if (!req.body) return res.sendStatus(400);
    const bookname = req.body.bookname;
    const author = req.body.author;
    const abstractname = req.body.abstractname;
    const isbn = req.body.isbn;
    const review = req.body.review;
    const id = req.body.id;

    pool.query("UPDATE library_table SET bookname=?, author=?, abstractname=?, isbn=?, review=? WHERE id=?", [bookname, author, abstractname, isbn, review, id], function(err, data) {
        if (err) return console.log(err);
        res.redirect("../");
    });
});
module.exports = router;