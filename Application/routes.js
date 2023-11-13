const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', function(req, res){
  res.send('/html/main');
});

app.get('/html/register', function(req, res){
  const {fName, lName, birth, user, password} = req.body;
});

