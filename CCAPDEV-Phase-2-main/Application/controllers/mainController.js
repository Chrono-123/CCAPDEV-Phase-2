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

getLogin: app.get('/login', function(req, res) {
   res.render('login');
});

getRegister: app.get('/register', function(req, res) {
   res.render('register');
});
module.exports = app;