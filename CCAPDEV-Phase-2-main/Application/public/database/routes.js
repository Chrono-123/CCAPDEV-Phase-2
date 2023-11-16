const express = require('express');
const bodyParser = require('body-parser');
const server = require('./Application/public/database/server.js');
import { getDb } from './conn.js';
const app = express();

const db = getDb();

app.get('/', function(req, res){
  res.send('/html/main');
});

app.get('/html/register', function(req, res) {
  db.collection("test").insertOne({
        firstName: req.body.fName,
        lastName: req.body.lName,
        dateOfBirth: req.body.birth,
        userName: req.body.user,
        password: req.body.password
    }).then(val => {
        console.log("Insert successful: ");
        console.log(val);
    }).catch(error => {
        console.log("Insert op error: " + error);
    });
});

app.post('/html/profile', function(req, res){
});
