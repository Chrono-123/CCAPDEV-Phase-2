const express = require('express');
const lab = require('./labController.js');
const labTech = require('./labTechController.js');
const student = require('./studentController.js');

const app = express();

getMain: app.get('/', function(req, res) {
   res.redirect('/main');
});

getMainBody: app.get('/main', function(req, res) {
   res.render('main');
});

module.exports = app;