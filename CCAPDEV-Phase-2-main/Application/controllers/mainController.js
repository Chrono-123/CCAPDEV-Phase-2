// const db = require('../app.js');
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
                console.log("Insert successful: ");
                console.log(val);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });
            res.redirect('/main');
        };

        res.render(`main`);
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

    getLab: function(req, res) {
        const lab = req.params.lab

        if(lab == "lab1") {
            res.render(`Lab1`);
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

    viewSlot: function(req, res) {
        res.render(`ViewSlot`);
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
    }
}

module.exports = controller;