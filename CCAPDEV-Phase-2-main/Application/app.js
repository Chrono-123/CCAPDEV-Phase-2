import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import exphbs from "express-handlebars";
import fs from 'fs';

import { connectToMongo, getDb } from './public/database/conn.js';
import { Lab1, Lab2, Lab3 } from "./models/labSchema.js";
import Student from "./models/studentSchema.js";
import LabTech from "./models/labTechSchema.js";
// import {} from "./controllers/labController.js";
// import {} from "./controllers/studentController.js";
// import {} from "./controllers/labTechController.js";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const routes = express.Router();

routes.route("/register").post(function (req, res) {
    res.send('User: ${req.body.fName} ${req.body.lName} ${req.body.birth} ${req.body.user} ${req.body.password}');
});

// get(function (req, res) {
//     Restaurant.findById(req.params.id).then((restaurant) => {
//         res.json(restaurant);
//         res.end();
//     });
// });

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
        title: req.body,
        name: "Sean"
        // body: ""
    })
});

// app.get('/html/login', function(req, res){
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
        
// app.get('/register', function(req, res) {
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

app.post('/register', (req, res) => {
    res.send('User: ${req.body.fName} ${req.body.lName} ${req.body.birth} ${req.body.user} ${req.body.password}');
});

// app.post('/html/profile', function(req, res){
// });

app.use(routes);

app.listen(port, () => {
    console.log("Server is running on port:" + port);
    connectToMongo((error) => {
        if (error) {
            console.log("error occured:");
            console.error(error);
            process.exit();
        }
    
        console.log("Connected to MongoDB server")
    
        const db = getDb();
    });
});

