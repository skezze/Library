const express = require("express");
const create = require("./controllers/create");
const index = require("./controllers/index");
const deletedata = require("./controllers/delete");
const edit = require("./controllers/edit");
const app = express();

app.use(express.static(__dirname));



app.set("view engine", "hbs");

app.use('/', index);
app.use('/create', create);
app.use('/delete', deletedata);
app.use('/edit', edit);

app.listen(3000, function() {
    console.log("Сервер ожидает подключения...");
})