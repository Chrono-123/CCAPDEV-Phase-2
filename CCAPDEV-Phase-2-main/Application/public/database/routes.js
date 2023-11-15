const express = require('express');
const bodyParser = require('body-parser');
const server = require('./Application/public/database/server.js');
import { getDb } from './conn.js';
const app = express();


app.get('/', function(req, res){
  res.send('/html/main');
});

app.get('/html/register', function(req, res) {
  const data = {fname, lname, birth, user, password} = req.body;
  db.collection("lab").insertOne('data', function(req, res){
    db.close();
  })
});

app.post('/html/profile', function(req, res){
});
