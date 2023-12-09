const express = require('express');
const controller = require('../controllers/mainController.js');
const registrationController = require('../controllers/registrationController.js');
const reservationController = require('../controllers/reservationController.js');
const testController = require('../controllers/testController.js');
const userController = require('../controllers/userController.js');
const app = express();

app.get(`/`, controller.getMain);
app.get(`/login`, controller.login);
app.get(`/logout`, controller.logout);
app.get(`/register`, controller.register);

app.post(`/checkUser`, controller.checkUser);
app.get(`/home/:userName`, controller.getStudent);
app.get(`/labTechHome/:userName`, controller.getLabTech);

app.post(`/registerUser`, registrationController.registerUser);
// app.get(`/registrationType`, registrationController.registrationType);
// app.get(`/studentRegister`, registrationController.studentRegister);
// app.get(`/labTechRegister`, registrationController.labTechRegister);

// app.post(`/registerStudent`, registrationController.registerStudent);
// app.post(`/registerLabTech`, registrationController.registerLabTech);

app.get(`/about`, userController.about);
app.get(`/home`, userController.home);
app.get(`/reservation`, userController.reservation);
app.get(`/search`, userController.search);
app.get(`/profile`, userController.profile);
app.get(`/profile/:action`, userController.getStudentStatus);

app.get(`/labTechHome`, userController.labTechHome);
app.get(`/labTechReservation`, userController.labTechReservation);
app.get(`/labTechSearch`, userController.labTechSearch);
app.get(`/labTechProfile`, userController.labTechProfile);
app.get(`/labTechProfile/:action`, userController.getLabTechStatus);

app.post(`/loadLab`, userController.loadLab);

app.get(`/reserveSlot`, reservationController.reserveSlot);
app.get(`/editSlot`, reservationController.editSlot);
app.get(`/deleteSlot`, reservationController.deleteSlot);
app.get(`/viewSlot`, reservationController.viewSlot);

app.post(`/reserve`, reservationController.reserve);
app.get(`/lab/:labNumber`, userController.getLab);

app.post(`/slotView`, reservationController.slotView)
app.get(`/viewSlot/:labNumber`, reservationController.getSlotView);
app.post(`/slotEdit`, reservationController.slotEdit)
app.get(`/editSlot/:labNumber`, reservationController.getSlotEdit);
app.post(`/edit`, reservationController.edit);
app.post(`/slotDelete`, reservationController.slotDelete);
app.get(`/deleteSlot/:labNumber`, reservationController.getSlotDelete);
app.post(`/delete`, reservationController.delete);
// app.get(`/slots/:reservation`, controller.getReservation);

app.post(`/searchType`, userController.searchType);
app.get(`/type/:userName`, userController.getUserName);
app.get(`/type/`, userController.getFreeSlots);

app.post(`/updateAndDelete`, userController.updateAndDelete);
// app.get(`/profile/:action`, userController.getStudentStatus);
// app.get(`/profile/:user`, controller.profile);

module.exports = app;