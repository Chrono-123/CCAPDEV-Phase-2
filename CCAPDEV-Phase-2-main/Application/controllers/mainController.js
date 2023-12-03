// const db = require('../app.js');
const mongoose = require('mongoose');
const labModel = require('../models/labSchema.js');
const userModel = require('../models/userSchema.js');
const argon2 = require('argon2');
const crypto = require('crypto');
const cookieparser = require('cookie-parser');

const hashingConfig = {
    parallelism: 1,
    memoryCost: 64000,
    timeCost: 3
}

const oneDay = (1000 * 60 * 60 * 24) * 21;

async function hashPassword(password) {
//creates hashed password; puts hashed pw, config, salt together and returns it
    const salt = crypto.randomBytes(16); //generates new salt every call
    return await argon2.hash(password, { //return string
        ...hashingConfig,
        salt
    })
};

async function verifyPassword(hash, password) { 
    return await argon2.verify(hash, password, hashingConfig);
};

async function accountExist(user) {
    const exists = await userModel.find({
        userName: user,
        userType: 'studentUser'
    },
    {
        userName: 1
    });

    console.log("number of items:" + exists.length);
    if (exists.length <= 0){
        return false;
    }else{
        return true;
    };
};

async function techAccountExist(user){
    const exists = await userModel.find({
        userName: user,
        userType: 'labTechUser'
    },
    {
        userName: 1
    });

    console.log("number of tech items:" + exists.length);
    if (exists.length <= 0){
        return false;
    }else{
        return true;
    };
};

const mainController = {
    getMain: async function(req, res) {
        await userModel.findOneAndRemove({userType: "tempUser"}).then(user => {
            console.log("this is the user removed!!!", user);
        }).catch(error => {
            console.log("Insert op error: " + error);
        });

        res.render(`main`);
    },

    login: function(req, res) {
        res.render(`Login`);
    },

    register: function(req, res) {
        res.render(`Register`);
    },

    checkUser: async function(req, res) {
        var userName = req.body.user;
        const password = req.body.password;
        const rememberMe = req.body.rememberMeLogin;
        const kuuki = req.cookies;
        var hashPassword;
        console.log("in check user");
        console.log(password);

        console.log("i am kuuki", kuuki);
        if (kuuki) {
            console.log("cookie: " + kuuki);
            if((await accountExist(kuuki.username))) {
                console.log("inside kuuki");
                session = req.session;
                session.userId = req.body.userName;
                console.log(req.session);
                await userModel.findOne({userName: userName}).then(user => {
                    const tempUser = new userModel({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        dateOfBirth: user.dateOfBirth,
                        userName: user.userName,
                        password: user.password,
                        userType: "tempUser"
                    });
                }).catch(error => {
                console.log("Insert op error: " + error);
                });

                res.cookie("foo", "bar", {
                    username: tempUser.userName,
                    maxAge: oneDay
                })
            }

        }

        if((await accountExist(userName))) {
            await userModel.findOne({userName: userName, userType: "studentUser"}).then(user => {
                session = req.session;
                session.userId = req.body.user;
                console.log(req.session);
                hashPassword = user.password;
                console.log(hashPassword);
                console.log("User found: ");
                console.log("in student model find");
                console.log(user);
                console.log(user.password);
                if (verifyPassword(hashPassword, req.body.password)) {
                    console.log("in verify password");
                    const tempUser = new userModel({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        idNumber: user.idNumber,
                        dateOfBirth: user.dateOfBirth,
                        userName: user.userName,
                        password: user.password,
                        userType: "tempUser"
                    });

                    tempUser.save().then(val => {
                        console.log("Insert successful: ");
                        console.log(val);
                    }).catch(error => {
                        console.log("Insert op error: " + error);
                    });
                    res.statusMessage = "student";
                    res.status(200);
                }else{
                    res.sendStatus(400);
                }

                res.send();
            }).catch(error => {
                console.log("Insert op error: " + error);
            });
        } else if((await techAccountExist(userName))) {
            console.log("in else if");
            await userModel.findOne({userName: userName, userType: "labTechUser"}).then(user => {
                session = req.session;
                session.userId = req.body.user;
                console.log(req.session);
                hashPassword = user.password;
                console.log("User found: ");
                console.log(user);
                console.log(user.password);
                if (verifyPassword(hashPassword, req.body.password)) {
                    console.log("in verify password");
                    const tempUser = new userModel({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        idNumber: user.idNumber,
                        dateOfBirth: user.dateOfBirth,
                        userName: user.userName,
                        password: user.password,
                        userType: "tempUser"
                    });

                    tempUser.save().then(val => {
                        console.log("Insert successful: ");
                        console.log(val);
                    }).catch(error => {
                        console.log("Insert op error: " + error);
                    });
                    res.statusMessage = "labTech";
                    res.status(200);
                }else{
                    console.log("no");
                    res.sendStatus(400);
                }
                
                res.send();
            }).catch(error => {
                console.log("Insert op error: " + error);
            });
        } else {
            res.sendStatus(400);
        }
        if (rememberMe&&userType) {
            console.log("inside cookie foo");
            res.cookie("foo", "bar", {
                username: tempUser.userName,
                maxAge: oneDay
            })
        }
    },
    
    getStudent: function(req, res) {
        const userName = req.params.userName;

        res.render(`Home`, { userName: userName });
    },

    getLabTech: function(req, res) {
        const userName = req.params.userName;

        res.render(`LabTechHome`, { userName: userName });
    },

    logout: function(req, res) {
        req.session.destroy();
        res.redirect('/');
        req.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}

module.exports = mainController;