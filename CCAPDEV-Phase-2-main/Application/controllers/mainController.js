const express = require('express');
const lab = require('./labController.js');
const labTech = require('./labTechController.js');
const student = require('./studentController.js');

const app = express();

app.get('/', function(req, res) {
   res.redirect('/main');
});

app.get('/main', function(req, res) {
   res.render('main');
});

module.exports = app;