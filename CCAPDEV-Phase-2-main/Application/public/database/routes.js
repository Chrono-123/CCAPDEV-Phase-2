const express = require('express');
const bodyParser = require('body-parser');
const server = require('./Application/public/database/server.js');
import { getDb } from './conn.js';
const app = express();

const db = getDb();
    // const data = {fname, lname, birth, user, password} = req.body;
    db.collection("test").insertOne({
        firstName: "Sean",
        lastName: "Lim",
        dateOfBirth: "11/10/01",
        userName: "Jesus",
        password: "Iamjesus"
    }).then(val => {
        console.log("Insert successful: ");
        console.log(val);
    }).catch(error => {
        console.log("Insert op error: " + error);
    });


app.get('/', function(req, res){
  res.send('/html/main');
});

app.get('/html/register', function(req, res) {
  db.collection("test").insertOne({
        firstName: "Sean",
        lastName: "Lim",
        dateOfBirth: "11/10/01",
        userName: "Jesus",
        password: "Iamjesus"
    }).then(val => {
        console.log("Insert successful: ");
        console.log(val);
    }).catch(error => {
        console.log("Insert op error: " + error);
    });
});

app.post('/html/profile', function(req, res){
});
