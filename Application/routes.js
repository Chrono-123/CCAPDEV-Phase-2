const express = require('express');
const bodyParser = require('body-parser');
const db = require('/public/javascript/database/server.js');
const app = express();

app.get('/', function(req, res) => {
  res.send('/html/main');
});

app.get('/html/register', function(req, res) => { //html -> node js -> mongodb
  const data = {fName, lName, birth, user, password} = req.body;
  db.collection("laboratory").insertOne('data', function(req, res){
    db.close();
});

app.post('/html/profile', function(req, res) => { //mongodb -> node js -> html
  const data = {fName, lName, birth, user, password};
  db.collection("laboratory").findOne({'data'}, function(err, result)(
    db.close()
    );
  res.send{
    fName,
    lName,
    birth,
    user,
    password
  };
};
