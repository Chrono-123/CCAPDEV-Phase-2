import express from 'express';
import exphbs from 'express-handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.engine("hbs", exphbs.engine({extname: 'hbs'}));

app.set("view engine", "hbs");
app.set("views", "./views");

app.get('/', (req, res) => {
    res.redirect('/home');
});
app.get('/home', (req, res) => {
    res.render("index", {
        title: "homepage",
        name: "Sean"
    })
})

app.listen(port, () => {
    console.log("Server is running on port:" + port);
});

