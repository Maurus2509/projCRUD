const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/categoriesController");

const category = require("./categories/category");

//View engine
app.set('view engine', 'admin', 'ejs');

//Static
app.use(express.static('public'));

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database

connection.authenticate().then(() => {
    console.log("Conexão feita");
}).catch((error) => {
    console.log(error);
})

app.use("/", categoriesController);

app.get("/", (req, res) => {
    res.render("admin/categories/index.ejs");
});

app.listen(8080, () => {
    console.log("Servidor rodando.")
});