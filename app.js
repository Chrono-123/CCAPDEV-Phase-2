const dotenv = require(`dotenv`);
const express = require(`express`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const exphbs = require(`express-handlebars`);
const hbs = require(`hbs`);
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();

const oneDay = (1000 * 60 * 60 * 24) * 21;

app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { httpOnly: true, maxAge: oneDay },
  resave: false 
}));

app.use(cookieParser());

app.use(express.json());

dotenv.config();

const port = 3000;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + '/views/partials')
// hbs.registerPartials(__dirname + `/views/partials`)

app.use(express.static(`public`));
app.use(bodyParser.urlencoded( {extended: false} ))
app.use(`/`, routes);

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});

// module.exports = db;
