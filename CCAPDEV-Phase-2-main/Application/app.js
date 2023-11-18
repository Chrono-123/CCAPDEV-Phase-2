const dotenv = require(`dotenv`);
const express = require(`express`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const exphbs = require(`express-handlebars`);
const hbs = require(`hbs`);
const app = express();

app.use(express.json());

dotenv.config();

const port = 3000;

mongoose.connect('mongodb://localhost:27017/lab');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.set(`view engine`, `hbs`);
// hbs.registerPartials(__dirname + '/views/partials')
// hbs.registerPartials(__dirname + `/views/partials`)

app.use(express.static(`public`));
app.use(bodyParser.urlencoded( {extended: false} ))
app.use(`/`, routes);

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});

// module.exports = db;

