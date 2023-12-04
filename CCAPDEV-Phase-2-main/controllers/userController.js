const mongoose = require('mongoose');
const labModel = require('../models/labSchema.js');
const reservationModel = require('../models/reservationSchema.js');
const seatModel = require('../models/seatSchema.js');
const userModel = require('../models/userSchema.js');
const argon2 = require('argon2');
const crypto = require('crypto');

const hashingConfig = {
    parallelism: 1,
    memoryCost: 64000,
    timeCost: 3
}

async function hashPassword(password) {
//creates hashed password; puts hashed pw, config, salt together and returns it
    const salt = crypto.randomBytes(16); //generates new salt every call
    return await argon2.hash(password, { //return string
        ...hashingConfig,
        salt
    })
};

async function currentUserStudent(tempUserName){
    const currentUserStudent = await userModel.findOne({userName: tempUserName, userType: "studentUser"}).then(studentUser => {
        console.log("awman", studentUser);
        if(studentUser == null)
            return false;
        else {
            return true;
        }
    });

    return currentUserStudent;
};

async function currentUserLabTech(tempUserName){
    const currentUserLabTech = await userModel.findOne({userName: tempUserName, userType: "labTechUser"}).then(labTechUser => {
        console.log("awman", labTechUser);
        if(labTechUser == null)
            return false;
        else {
            return true;
        }
    });

    return currentUserLabTech;
};

async function userSearchStudent(userName){
    const userSearchStudent = await userModel.findOne({userName: userName, userType: "studentUser"}).then(studentUser => {
        console.log("awman", studentUser);
        if(studentUser == null)
            return false;
        else {
            return true;
        }
    });

    return userSearchStudent;
};

async function userSearchLabTech(userName){
    const userSearchLabTech = await userModel.findOne({userName: userName, userType: "labTechUser"}).then(labTechUser => {
        console.log("awman", labTechUser);
        if(labTechUser == null)
            return false;
        else {
            return true;
        }
    });

    return userSearchLabTech;
};

const userController = {
    about: async function(req, res) {
        var tempUserName;

        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
        });
        
        if(await currentUserStudent(tempUserName)) {
            res.render(`About`, {student: true});
        } else if(await currentUserLabTech(tempUserName)) {
            res.render(`About`, {labTech: true});
        }
    },

    home: function(req, res) {
        res.render(`Home`);
    },

    reservation: function(req, res) {
        res.render(`Reservation`);
    },

    search: function(req, res) {
        res.render(`Search`);
    },

    profile: async function(req, res) {
        var firstName;
        var lastName;
        var idNumber;
        var dateOfBirth;
        var userName;
        var password;

        await userModel.findOne({userType: "tempUser"}).then(user => {
            firstName = user.firstName;
            lastName = user.lastName;
            idNumber = user.idNumber;
            dateOfBirth = user.dateOfBirth;
            userName = user.userName;
            password = user.password;

            console.log("this is the user!!!", user);
        }).catch(error => {
            console.log("Insert op error: " + error);
        });

        res.render(`Profile`, {firstName: firstName, lastName: lastName, idNumber: idNumber, dateOfBirth: dateOfBirth, userName: userName, password: password});
    },

    getStudentStatus: function(req, res) {
        const action = req.params.action

        console.log("this is status", action);

        if(action == "update") {
            res.redirect(`/profile`);
        } else if(action == "delete") {
            res.redirect(`/`);
        } else
            console.log("No status designated!");
    },

    labTechHome: function(req, res) {
        res.render(`LabTechHome`);
    },

    labTechReservation: function(req, res) {
        res.render(`LabTechReservation`);
    },
    
    labTechSearch: function(req, res) {
        res.render(`LabTechSearch`);
    },
    
    labTechProfile: async function(req, res) {
        var firstName;
        var lastName;
        var idNumber;
        var dateOfBirth;
        var userName;
        var password;

        await userModel.findOne({userType: "tempUser"}).then(user => {
            firstName = user.firstName;
            lastName = user.lastName;
            idNumber = user.idNumber;
            dateOfBirth = user.dateOfBirth;
            userName = user.userName;
            password = user.password;
            userType = user.userType;

            console.log("this is the user!!!", user);
        }).catch(error => {
            console.log("Insert op error: " + error);
        });

        res.render(`LabTechProfile`, {firstName: firstName, lastName: lastName, idNumber: idNumber, dateOfBirth: dateOfBirth, userName: userName, password: password});
    },
    
    getLabTechStatus: function(req, res) {
        const status = req.params.status

        console.log("this is status", status);

        if(status == "update") {
            res.redirect(`/labTechProfile`);
        } else if(status == "delete") {
            res.redirect(`/`);
        } else
            console.log("No status designated!");
    },

    loadLab: function(req, res) {
        const labNumber = req.body.lab;

        console.log(labNumber);

        res.redirect(`/lab/` + labNumber);
    },

    getLab: async function(req, res) {
        const labNumber = req.params.labNumber
        var tempUserName;
        
        console.log("I AM THE LAB:", labNumber);

        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
        });

        if(await currentUserStudent(tempUserName)) {
            await reservationModel.find({labNumber: labNumber}).then(reservations => {
                console.log(reservations);
                
                res.render(`Lab`, {reservations: reservations, student: true});
            }).catch(error => {
                console.log("Insert op error: " + error);
            });
        } else if(await currentUserLabTech(tempUserName)) {
            await reservationModel.find({labNumber: labNumber}).then(reservations => {
                console.log(reservations);
                
                res.render(`Lab`, {reservations: reservations, labTech: true});
            }).catch(error => {
                console.log("Insert op error: " + error);
            });
        }
    },

    searchType: async function(req, res) {
        const isSearchUser = req.body.isSearchUser;
        const userName = req.body.userName;
        const seatNum = req.body.seatNum;
        const labNumber = req.body.labNum;
        const action = req.body.action;

        console.log(isSearchUser);
        console.log(seatNum);
        console.log(labNumber);
        console.log("username = ", userName);

        const userExists = await userModel.findOne({userName: userName}).then(user => {
            if(user == null) {
                return false;
            } else {
                return true;
            }
        });
        
        const seatExists = await seatModel.findOne({seatNum: seatNum, labNumber: labNumber}).then(seat => {
            if(seat == null) {
                return false;
            } else
                return true;
        });
        
        console.log(seatExists);
        
        if(action == "searchUser") {
            if(userExists) {
                res.redirect(`/type/` + userName);
            } else {
                const error = "User does not exist!";
                res.render(`Search.hbs`, {error: error});
                console.log("User does not exist!");
            }
        } else if(action == "searchSlots") {
            if(seatNum == "" || labNumber == "") {
                const error = "One or more missing fields!";
                res.render(`Search.hbs`, {error: error});
                console.log("Seat is already taken!");
            } else if(seatExists) {
                const error = "Seat is already taken!";
                res.render(`Search.hbs`, {error: error});
                console.log("Seat is already taken!");
            } else {
                const error = "Seat is free!";
                res.render(`Search.hbs`, {error: error});
                console.log("Seat is free!");
            }
        }
    },

    getUserName: async function(req, res) {
        const userName = req.params.userName;
        var firstName;
        var lastName;
        var idNumber;
        var dateOfBirth;
        var password;
        var tempUserName;

        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
        });

        console.log("in get username");
        console.log(tempUserName);
        console.log(userName);
        console.log("inside1");
        if(await currentUserStudent(tempUserName)) {
            console.log("im in here");
            if(await userSearchStudent(userName)) {
                userModel.findOne({userName: userName, userType: "studentUser"}).then(studentUser => {
                    firstName = studentUser.firstName;
                    lastName = studentUser.lastName;
                    idNumber = studentUser.idNumber;
                    dateOfBirth = studentUser.dateOfBirth;
                    password = studentUser.password;
    
                    res.render(`ViewProfile`, {firstName: firstName, lastName: lastName, idNumber: idNumber, dateOfBirth: dateOfBirth, userName: userName, password: password, student: true});
                }).catch(error => {
                    console.log("Insert op error: " + error);
                });
            } else if(await userSearchLabTech(userName)) {
                userModel.findOne({userName: userName, userType: "labTechUser"}).then(labTechUser => {
                    console.log(labTechUser);
                    firstName = labTechUser.firstName;
                    lastName = labTechUser.lastName;
                    idNumber = labTechUser.idNumber;
                    dateOfBirth = labTechUser.dateOfBirth;
                    password = labTechUser.password;
    
                    res.render(`ViewProfile`, {firstName: firstName, lastName: lastName, idNumber: idNumber, dateOfBirth: dateOfBirth, userName: userName, password: password, student: true});
                }).catch(error => {
                    console.log("Insert op error: " + error);
                });
            }
        } else if(await currentUserLabTech(tempUserName)) {
            if(await userSearchStudent(userName)) {
                userModel.findOne({userName: userName, userType: "studentUser"}).then(studentUser => {
                    console.log(studentUser);
                    firstName = studentUser.firstName;
                    lastName = studentUser.lastName;
                    idNumber = studentUser.idNumber;
                    dateOfBirth = studentUser.dateOfBirth;
                    password = studentUser.password;
    
                    res.render(`ViewProfile`, {firstName: firstName, lastName: lastName, idNumber: idNumber, dateOfBirth: dateOfBirth, userName: userName, password: password, labTech: true});
                }).catch(error => {
                    console.log("Insert op error: " + error);
                });
            } else if(await userSearchLabTech(userName)) {
                userModel.findOne({userName: userName, userType: "labTechUser"}).then(labTechUser => {
                    console.log(labTechUser);
                    firstName = labTechUser.firstName;
                    lastName = labTechUser.lastName;
                    idNumber = labTechUser.idNumber;
                    dateOfBirth = labTechUser.dateOfBirth;
                    password = labTechUser.password;
    
                    res.render(`ViewProfile`, {firstName: firstName, lastName: lastName, idNumber: idNumber, dateOfBirth: dateOfBirth, userName: userName, password: password, labTech: true});
                }).catch(error => {
                    console.log("Insert op error: " + error);
                });
            }
        };
    },

    getFreeSlots: async function(req, res) {
        const seatNum = req.params.seatNum;
        const labNum = req.params.labNum;

        console.log(seatNum);
        console.log(labNum);
    },

    updateAndDelete: async function(req, res) {
        const action = req.body.action;
        const name = req.body.name;
        const idNumber = req.body.idNumber;
        const dateOfBirth = req.body.dateOfBirth;
        const userName = req.body.userName;
        const password = req.body.password;
        var tempUserName;
        var nameParts = [];
        var firstName;
        var lastName;
        nameParts.push(name.split(" "));
        nameLength = nameParts.length;
        console.log(name);
        console.log(nameLength);
        if(nameLength > 1) {
            firstName = nameParts[0].trim();
            lastName = nameParts[1].trim();
        } else {
            firstName = name;
            lastName = "";
        }

        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
        });
        console.log(dateOfBirth);
        console.log(userName);
        console.log(idNumber);
        console.log(password);
        console.log(nameParts);
        console.log(firstName);
        console.log(lastName);
        console.log(action);
        if(action == "delete") {
            console.log("in delete");
            await userModel.findOneAndRemove({userName: userName, userType: "studentUser"}).then(user => {
                console.log("this is the user removed!!!", user);
                
                res.redirect(`/profile/` + action);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });

            await userModel.findOneAndRemove({userName: userName, userType: "labTechUser"}).then(user => {
                console.log("this is the user removed!!!", user);

                res.redirect(`/labTechProfile/` + action);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });
        } else if(action == "update") {
            console.log("in update");

            try {
                console.log("inside3");
                await userModel.findOneAndUpdate({userName: tempUserName, userType: "tempUser"}, {
                    firstName: firstName,
                    lastName: lastName,
                    idNumber: idNumber,
                    dateOfBirth: dateOfBirth,
                    userName: userName,
                    password: await hashPassword(password),
                })
            } catch (err) {
                console.log(err)
            }

            try {
                console.log("inside1");
                await userModel.findOneAndUpdate({userName: tempUserName, userType: "studentUser"}, {
                    firstName: firstName,
                    lastName: lastName,
                    idNumber: idNumber,
                    dateOfBirth: dateOfBirth,
                    userName: userName,
                    password: await hashPassword(password),
                }).then(user => {
                    console.log("this is the user removed!!!", user);
                    
                    res.redirect(`/profile/` + action);
                }).catch(error => {
                    console.log("Insert op error: " + error);
                });
            } catch (err) {
                console.log(err)
            }

            try {
                console.log("inside2");
                await userModel.findOneAndUpdate({userName: tempUserName, userType: "labTechUser"}, {
                    firstName: firstName,
                    lastName: lastName,
                    idNumber: idNumber,
                    dateOfBirth: dateOfBirth,
                    userName: userName,
                    password: await hashPassword(password),
                }).then(user => {
                    console.log("this is the user removed!!!", user);
                    
                    res.redirect(`/labTechProfile/` + action);
                }).catch(error => {
                    console.log("Insert op error: " + error);
                });
            } catch (err) {
                console.log(err)
            }
        } else
            console.log("No status designated!");
    },
}

module.exports = userController;