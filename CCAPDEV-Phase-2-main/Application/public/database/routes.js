const express = require('express');
const bodyParser = require('body-parser');
const server = require('./Application/public/database/server.js');
const app = express();
const controller = require('../../controllers/mainController.js');

module.exports = app;
// app.get('/', function(req, res){
//   res.send('/html/main');
// });

// app.get('/html/register', function(req, res) {
//   const data = {fname, lname, birth, user, password} = req.body;
//   db.collection("lab").insertOne('data', function(req, res){
//     db.close();
//   })
// });

// app.post('/html/profile', function(req, res){
// });
