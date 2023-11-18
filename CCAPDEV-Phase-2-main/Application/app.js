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
// import {} from "./controllers/labController.js";
// import {} from "./controllers/studentController.js";
// import {} from "./controllers/labTechController.js";

// import { fileURLToPath } from `url`;
// import { dirname } from `path`;

// app.use(bodyParser.urlencoded({ extended: false }));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// routes.get("/", function(req, res) {
//     res.render(`sample`)
// })
// routes.route("/register").get(function (req, res) {
//     Student.find().then((students) => {
//       res.json(students);
//       res.end();
//     });
//   });
// routes.route("/register").post(function (req, res) {
//     res.send(`User: ${req.body.fName} ${req.body.lName} ${req.body.birth} ${req.body.user} ${req.body.password}`);
// });

// get(function (req, res) {
//     Restaurant.findById(req.params.id).then((restaurant) => {
//         res.json(restaurant);
//         res.end();
//     });
// });

// app.get(`/html/login`, function(req, res){
//     var loginUserName = req.body.username;
//     var loginPassword = req.body.password;
  
//     this.acctIdNum = db.collection("test").find({
//         userName: loginUserName,
//         password: loginPassword
//     },
//         {_id: 1
//     }).then(val => {
//         console.log("found ");
//         console.log(val);
//     }).catch(error => {
//         console.log("Account not found");
//     });
// });
        
// app.get(`/register`, (req, res) => {
//     res.render("index", {
//         title: req.body
//     })
//     // db.collection("test").insertOne({
//     //     firstName: req.body.fName,
//     //     lastName: req.body.lName,
//     //     dateOfBirth: req.body.birth,
//     //     userName: req.body.user,
//     //     password: req.body.password
//     // }).then(val => {
//     //     console.log("Insert successful: ");
//     //     console.log(val);
//     // }).catch(error => {
//     //     console.log("Insert op error: " + error);
//     // });
// });

// app.post(`/registered`, (req, res) => {
//     app.get("/register", (req, res) => {
//         res.render("index", JSON.stringify({
//             title: req.body
//         }))
//     })
//     console.log("Sean");
//     console.log(req.body);
//     console.log(req.is(`json`));
// });

// app.post(`/html/profile`, function(req, res){
// });

app.set(`view engine`, `hbs`);
// hbs.registerPartials(__dirname + '/views/partials')
// hbs.registerPartials(__dirname + `/views/partials`)

app.use(express.static(`public`));
app.use(bodyParser.urlencoded( {extended: false} ))
app.use(`/`, routes);

app.listen(port, () => {
  console.log("Server is running on port:" + port);
  mongoose.connect('mongodb://localhost:27017/');

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
});

