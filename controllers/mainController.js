// const db = require('../app.js');
const mongoose = require('mongoose');
const labModel = require('../models/labSchema.js');
const userModel = require('../models/userSchema.js');
const argon2 = require('argon2');
const crypto = require('crypto');
const cookieparser = require('cookie-parser');
const session = require('express-session');

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
    return await argon2.verify(hash, password, hashingConfig).catch(() => {
        throw new Error('Something went wrong. Please try again.')
    }).then(match => {
        if (match) {
            return true;
        } else {
            return false;
        }
    });
};

async function accountExist(username) {
    const exists = await userModel.find({
        userName: username,
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

async function techAccountExist(username){
    const exists = await userModel.find({
        userName: username,
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
        
        // if(session.userid) {
        // }
    },

    login: function(req, res) {
        res.render(`Login`);
    },

    register: function(req, res) {
        res.render(`Register`);
    },

    checkUser: async function(req, res) {
        const userName = req.body.user;
        const password = req.body.password;
        const rememberMe = req.body.rememberMeLogin;
        const kuuki = req.cookies;
        var hashPassword;
        var firstName;
        var lastName;
        var idNumber;
        var dateOfBirth;
        // req.session.foo;
        // console.log("req session", req.session.foo);
        console.log("in check user");
        console.log(password);

        // console.log("i am kuuki", kuuki);
        // if (kuuki) {
        //     console.log("cookie: " + kuuki);
        //     if((await accountExist(kuuki.username))) {
        //         console.log("inside kuuki");
        //         session = req.session;
        //         session.userId = req.body.userName;
        //         console.log(req.session);
        //         await userModel.findOne({userName: userName}).then(user => {
        //             const tempUser = new userModel({
        //                 firstName: user.firstName,
        //                 lastName: user.lastName,
        //                 dateOfBirth: user.dateOfBirth,
        //                 userName: user.userName,
        //                 password: user.password,
        //                 userType: "tempUser"
        //             });
        //         }).catch(error => {
        //         console.log("Insert op error: " + error);
        //         });

        //         res.cookie("foo", "bar", {
        //             username: tempUser.userName,
        //             maxAge: oneDay
        //         })
        //     }
        // }

        if(rememberMe) {
            session = req.session;
            session.userId = req.body.user;
        }

        if((await accountExist(userName))) {
            await userModel.findOne({userName: userName, userType: "studentUser"}).then(user => {
                console.log(req.session);
                hashPassword = user.password;
                firstName = user.firstName;
                lastName = user.lastName;
                idNumber = user.idNumber;
                dateOfBirth = user.dateOfBirth;
                console.log(hashPassword);
                console.log("User found: ");
                console.log("in student model find");
                console.log(user);
                console.log(user.password);
            }).catch(error => {
                console.log("Insert op error: " + error);
                res.render(`Login`, {error: error});
            });
            
            console.log("password is existing", await verifyPassword(hashPassword, req.body.password));
            if (await verifyPassword(hashPassword, req.body.password)) {
                console.log("in verify password");
                // console.log(verifyPassword);
                console.log("im first name", firstName);
                const tempUser = new userModel({
                    firstName: firstName,
                    lastName: lastName,
                    idNumber: idNumber,
                    dateOfBirth: dateOfBirth,
                    userName: userName,
                    password: password,
                    userType: "tempUser"
                });

                tempUser.save().then(val => {
                    console.log("Insert successful: ");
                    console.log(val);
                }).catch(error => {
                    console.log("Insert op error: " + error);
                });
                // res.statusMessage = "student";
                // res.status(200);
                res.redirect(`/home/` + userName);
            }else{
                // res.sendStatus(400);
                const error = "Invalid password";
                res.render(`Login`, {error: error});
            }
        } else if((await techAccountExist(userName))) {
            console.log("in else if");
            await userModel.findOne({userName: userName, userType: "labTechUser"}).then(user => {
                console.log(req.session);
                hashPassword = user.password;
                firstName = user.firstName;
                lastName = user.lastName;
                idNumber = user.idNumber;
                dateOfBirth = user.dateOfBirth;
                console.log("User found: ");
                console.log(user);
                console.log(user.password);
                // res.send();
            }).catch(error => {
                res.render(`Login`, {error: error});
            });
            if (await verifyPassword(hashPassword, req.body.password)) {
                console.log("in verify password");
                console.log(verifyPassword);
                const tempUser = new userModel({
                    firstName: firstName,
                    lastName: lastName,
                    idNumber: idNumber,
                    dateOfBirth: dateOfBirth,
                    userName: userName,
                    password: password,
                    userType: "tempUser"
                });

                tempUser.save().then(val => {
                    console.log("Insert successful: ");
                    console.log(val);
                }).catch(error => {
                    console.log("Insert op error: " + error);
                });
                // res.statusMessage = "student";
                // res.status(200);
                res.redirect(`/home/` + userName);
            }else{
                // res.sendStatus(400);
                const error = "Invalid password";
                res.render(`Login`, {error: error});
            }
        } else {
            // res.sendStatus(400);
            const error = "Invalid username";
            res.render(`Login`, {error: error});
        }
        // if (rememberMe&&userType) {
            
        //     console.log("inside cookie foo");
        //     req.session.foo = "bar";
        //     res.cookie("foo", "bar", {
        //         username: tempUser.userName,
        //         maxAge: oneDay
        //     })
        // }
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