// const db = require('../app.js');
const mongoose = require('mongoose');
const lab1Model = require('../models/lab1Schema.js');
const lab2Model = require('../models/lab2Schema.js');
const lab3Model = require('../models/lab3Schema.js');
const studentModel = require('../models/studentSchema.js');
const labTechModel = require('../models/labTechSchema.js');
const tempUserModel = require('../models/temporaryUserSchema.js');

async function accountExist(user) {
    const exists = await studentModel.find({
        userName: user
    },
    {
        userName: 1
    });

    console.log("number of items:" + exists.length);
    if (exists.length <= 0){
        return 0;
    }else{
        return 1;
    };
};

async function techAccountExist(user){
    const exists = await labTechModel.find({
        userName: user
    },
    {
        userName: 1
    });

    console.log("number of items:" + exists.length);
    if (exists.length <= 0){
        return 0;
    }else{
        return 1;
    };
};

async function findUserId(userName){
    var userId;

    const user = await labTechModel.find({userName: userName}).then(user => {
        console.log("this is the user", user);
        userId =  mongoose.Types.ObjectId(user.id);
    }).catch(error => {
        console.log("Insert op error: " + error);
    });

    return userId;
};

const controller = {
    getMain: async function(req, res) {
        await tempUserModel.findOneAndRemove().then(user => {
            console.log("this is the user removed!!!", user);
        }).catch(error => {
            console.log("Insert op error: " + error);
        });

        res.render(`main`);
    },

    login: function(req, res) {
        res.render(`Login`);
    },

    checkUser: function(req, res) {
        const userName = req.body.user;
        const password = req.body.password;
        
        const studentFound = studentModel.findOne({userName: userName, password: password}).then(user => {
            console.log("User found: ");
            console.log(user);
            console.log(user.password);
            const tempUser = new tempUserModel({
                firstName: user.firstName,
                lastName: user.lastName,
                dateOfBirth: user.dateOfBirth,
                userName: user.userName,
                password: user.password
            });

            tempUser.save().then(val => {
                console.log("Insert successful: ");
                console.log(val);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });
        }).catch(error => {
            console.log("Insert op error: " + error);
        });

        if(studentFound){
            res.redirect(`/home/` + userName);
        }
    },

    getStudent: function(req, res) {
        const userName = req.params.userName;

        res.render(`Home`, { userName: userName });
    },

    // getLabTech: function(req, res) {
    //     const userName = req.params.user;
    //     // var password = req.params.password;

    //     res.render(`LabTechHome`, {email: email});
    // },

    registrationType: function(req, res) {
        res.render(`RegistrationType`);
    },

    studentRegister: function(req, res) {
        res.render(`Register.hbs`);
    },

    labTechRegister: function(req, res) {
        res.render(`LabTechRegister.hbs`);
    },

    registerStudent: async function(req, res) {
        console.log(accountExist(req.body.user));
        if (await accountExist(req.body.user) >= 1){
            console.log("Username already exists");
            res.redirect('/studentRegister'); 
        }else{
            const student = new studentModel({
                firstName: req.body.fName,
                lastName: req.body.lName,
                dateOfBirth: req.body.birth,
                userName: req.body.user,
                password: req.body.password
            });

            student.save().then(val => {
            }).catch(error => {
                console.log("Insert op error: " + error);
            });
            
            res.redirect(`/`);
        };

    },

    registerTech: async function(req, res) {
        if (await techAccountExist(req.body.userLab) >= 1){
            console.log("Username already exists");
            res.redirect('/labTechRegisterRegister'); 
        }else{
            const labTech = new labTechModel({
                firstName: req.body.fNameLab,
                lastName: req.body.lNameLab,
                dateOfBirth: req.body.birthLab,
                userName: req.body.userLab,
                password: req.body.passwordLab
            });
            labTech.save().then(val => {
                console.log("Insert successful: ");
                console.log(val);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });
            res.redirect('/main');
        };
    },
    
    home: function(req, res) {
        res.render(`Home`);
    },

    loadLab: function(req, res) {
        const lab = req.body.lab;

        console.log(lab);

        res.redirect(`/lab/` + lab);
    },

    reservation: function(req, res) {
        res.render(`Reservation`);
    },

    reserveSlot: function(req, res) {
        res.render(`ReserveSlot`);
    },
    
    reserve: function(req, res) {
        const lab = req.body.lab;
        console.log(lab);

        if(lab == "lab1") {
            const reservation = new lab1Model({
                name: req.body.name,
                id: req.body.idNum,
                numOfSeats: req.body.numOfSeats,
                dateReserved: req.body.reservationDate
            });

            reservation.save().then(val => {
                console.log("Insert successful: ");
                console.log(val);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });

            res.redirect(`/lab/` + lab);
        } else if(lab == "lab2") {
            const reservation = new lab2Model({
                name: req.body.name,
                id: req.body.idNum,
                numOfSeats: req.body.numOfSeats,
                dateReserved: req.body.reservationDate
            });

            reservation.save().then(val => {
                console.log("Insert successful: ");
                console.log(val);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });

            res.redirect(`/lab/` + lab);
        } else if(lab == "lab3") {
            const reservation = new lab3Model({
                name: req.body.name,
                id: req.body.idNum,
                numOfSeats: req.body.numOfSeats,
                dateReserved: req.body.reservationDate
            });

            reservation.save().then(val => {
                console.log("Insert successful: ");
                console.log(val);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });

            res.redirect(`/lab/` + lab);
        } else
            console.log("No lab designated!");
        
        
    },

    getLab: async function(req, res) {
        const lab = req.params.lab

        console.log("I AM THE LAB:", lab);

        if(lab == "lab1") {
            await lab1Model.find({}).then(registrations => {
                // console.log(registrations);
                
                res.render(`Lab1`, {registrations: registrations});
            }).catch(error => {
                console.log("Insert op error: " + error);
            });

        } else if(lab == "lab2") {
            res.render(`Lab2`);
        } else if(lab == "lab3") {
            res.render(`Lab3`);
        } else
            console.log("No lab designated!");
    },

    searchType: function(req, res) {
        const userName = req.body.userName;
        const freeSlots = req.body.freeSlots;

        if(userName == "") {
            res.redirect(`/type/` + freeSlots);
        } else if(freeSlots == "") {
            res.redirect(`/type/` + userName);
        } else
            console.log("No type designated!");
    },

    getUserName: async function(req, res) {
        const userName = req.params.userName;
        var firstName;
        var lastName;
        var dateOfBirth;
        var password;

        await studentModel.findOne({userName: userName}).then(user => {
            firstName = user.firstName;
            lastName = user.lastName;
            dateOfBirth = user.dateOfBirth;
            password = user.password;
        }).catch(error => {
            console.log("Insert op error: " + error);
        });

        res.render(`Profile`, {firstName: firstName, lastName: lastName, dateOfBirth: dateOfBirth, userName: userName, password: password});
    },

    getFreeSlots: function(req, res) {
        const freeSlots = req.params.freeSlots;


    },

    editSlot: function(req, res) {
        res.render(`EditSlot`);
    },

    viewSlot: async function(req, res) {
        res.render(`ViewSlot`);
    },

    slot: function(req, res) {
        const lab = req.body.lab;

        res.redirect(`/viewSlot/` + lab)
    },

    getSlot: async function(req, res) {
        const lab = req.params.lab;
        var userName;

        await tempUserModel.findOne().then(user => {
            userName = user.userName;
        });

        if(lab == "lab1") { 
            await lab1Model.find({name: userName}).then(lab1Reservations => {
                console.log(lab1Reservations);
                lab1Reservations = lab1Reservations;

                res.render(`Slot`, {lab1Reservations: lab1Reservations});
            });
        } else if (lab == "lab2") { 
            await lab2Model.find({name: userName}).then(lab2Reservations => {
                console.log(lab2Reservations);
                lab2Reservations = lab2Reservations;

                res.render(`Slot`, {lab2Reservations: lab2Reservations});
            });
        } else if(lab == "lab3") { 
            await lab3Model.find({name: userName}).then(lab3Reservations => {
                console.log(lab3Reservations);
                lab3Reservations = lab3Reservations;

                res.render(`Slot`, {lab3Reservations: lab3Reservations});
            });
        } else 
            console.log("No lab designated!");
    },

    search: function(req, res) {
        res.render(`Search`);
    },

    profile: async function(req, res) {
        var firstName;
        var lastName;
        var dateOfBirth;
        var userName;
        var password;

        await tempUserModel.findOne().then(user => {
            firstName = user.firstName;
            lastName = user.lastName;
            dateOfBirth = user.dateOfBirth;
            userName = user.userName;
            password = user.password;

            console.log("this is the user!!!", user);
        }).catch(error => {
            console.log("Insert op error: " + error);
        });

        res.render(`Profile`, {firstName: firstName, lastName: lastName, dateOfBirth: dateOfBirth, userName: userName, password: password});
    },

    updateAndDelete: async function(req, res) {
        const firstName = req.body.name;
        const dateOfBirth = req.body.dateOfBirth;
        const userName = req.body.userName;
        const password = req.body.password;
        const del = req.body.delete;
        const up = req.body.update
        var tempUserName;

        if(del == "delete") {
            await studentModel.findOneAndRemove({userName: userName}).then(user => {
                console.log("this is the user removed!!!", user);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });

            await labTechModel.findOneAndRemove({userName: userName}).then(user => {
                console.log("this is the user removed!!!", user);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });

            res.redirect(`/profile/` + del);
        } else if(up == "update") {
            try {
                await tempUserModel.findOne().then(user => {
                    tempUserName = user.userName;
                });
            } catch (err) {
                console.log(err)
            }
            
            try {
                console.log("inside1");
                await studentModel.findOneAndUpdate({userName: tempUserName}, {
                    firstName: firstName,
                    lastName: "",
                    dateOfBirth: dateOfBirth,
                    userName: userName,
                    password: password,
                })
            } catch (err) {
                console.log(err)
            }

            try {
                console.log("inside2");
                await labTechModel.findOneAndUpdate({userName: tempUserName}, {
                    firstName: req.body.name,
                    lastName: "",
                    dateOfBirth: req.body.dateOfBirth,
                    userName: req.body.userName,
                    password: req.body.password,
                })
            } catch (err) {
                console.log(err)
            }

            try {
                console.log("inside3");
                await tempUserModel.findOneAndUpdate({userName: tempUserName}, {
                    firstName: req.body.name,
                    lastName: "",
                    dateOfBirth: req.body.dateOfBirth,
                    userName: req.body.userName,
                    password: req.body.password,
                })
            } catch (err) {
                console.log(err)
            }

            res.redirect(`/profile/` + up);
        } else
            console.log("No status designated!");
    },

    getStatus: function(req, res) {
        const status = req.params.status

        console.log("this is statues", status);

        if(status == "update") {
            res.render(`Profile`);
        } else if(status == "delete") {
            res.redirect(`/`);
        } else
            console.log("No status designated!");
    }
}

module.exports = controller;