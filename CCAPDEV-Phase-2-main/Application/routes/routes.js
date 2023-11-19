const express = require('express');
const controller = require('../controllers/mainController.js');
const labModel = require('../models/labSchema.js');
const studentModel = require('../models/studentSchema.js');
const labTechModel = require('../models/labTechSchema.js');
const app = express();

app.get(`/`, controller.getMain);
app.get(`/login`, controller.login);

app.post(`/checkUser`, controller.checkUser);
app.get(`/home/:user`, controller.getStudent);
// app.get(`/labTechHome/:email`, controller.getLabTech);

app.get(`/registrationType`, controller.registrationType);
app.get(`/studentRegister`, controller.studentRegister);
app.get(`/labTechRegister`, controller.labTechRegister);

app.post(`/registerStudent`, controller.registerStudent);
app.post(`/labTechRegister`, controller.labTechRegister);
module.exports = app;
