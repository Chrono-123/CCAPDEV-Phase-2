const express = require('express');
const controller = require('../controllers/mainController.js');
const app = express();

app.get(`/`, controller.getMain);
app.get(`/login`, controller.login);

app.post(`/checkUser`, controller.checkUser);
app.get(`/home/:userName`, controller.getStudent);
// app.get(`/labTechHome/:email`, controller.getLabTech);

app.get(`/registrationType`, controller.registrationType);
app.get(`/studentRegister`, controller.studentRegister);
app.get(`/labTechRegister`, controller.labTechRegister);

app.post(`/registerStudent`, controller.registerStudent);

app.get(`/home`, controller.home);
app.get(`/reservation`, controller.reservation);
app.get(`/search`, controller.search);
app.get(`/profile`, controller.profile);

app.post(`/loadLab`, controller.loadLab);

app.get(`/reserveSlot`, controller.reserveSlot);
app.get(`/editSlot`, controller.editSlot);
app.get(`/viewSlot`, controller.viewSlot);

app.post(`/reserve`, controller.reserve);
app.get(`/lab/:lab`, controller.getLab);

app.post(`/slot`, controller.slot)
app.get(`/viewSlot/:lab`, controller.getSlot);
// app.get(`/slots/:reservation`, controller.getReservation);

app.post(`/searchType`, controller.searchType);
app.get(`/type/:userName`, controller.getUserName);
app.get(`/type/:freeSlots`, controller.getFreeSlots);

app.post(`/updateAndDelete`, controller.updateAndDelete);
app.get(`/profile/:status`, controller.getStatus);
// app.get(`/profile/:user`, controller.profile);

module.exports = app;