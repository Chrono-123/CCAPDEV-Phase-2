const mongoose = require('mongoose');
const labModel = require('../models/labSchema.js');
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

async function verifyPassword(hash, password) { 
    return await argon2.verify(hash, password, hashingConfig);
};

async function accountExist(user) {
    const exists = await userModel.find({
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
    const exists = await userModel.find({
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

const registrationController = {
    registerUser: async function(req, res) {
        if(await accountExist(req.body.user) >= 1) {
            console.log("Student username already exists");
            res.redirect('/register');
        } else if(await techAccountExist(req.body.user) >= 1) {
            console.log("Labtech username already exists");
            res.redirect('/register');
        } else {
            try{
                console.log(req.body.regType);
                if (req.body.regType == 'student'){
                    const newStudent = new userModel({
                        firstName: req.body.fName,
                        lastName: req.body.lName,
                        idNumber: req.body.StudentId,
                        dateOfBirth: req.body.birth,
                        userName: req.body.user,
                        password: await hashPassword(req.body.password),
                        userType: "studentUser"
                    });
                    await newStudent.save();
                    res.sendStatus(200);
        
                }else if (req.body.regType == 'labTech'){
                    const newLabTech = new userModel({
                        firstName: req.body.fName,
                        lastName: req.body.lName,
                        idNumber: req.body.StudentId,
                        dateOfBirth: req.body.birth,
                        userName: req.body.user,
                        password: await hashPassword(req.body.password),
                        userType: "labTechUser"
                    });
                    await newLabTech.save();
                    res.sendStatus(200);
                }
                console.log("done");
                // res.redirect(`/`);
            }catch(err){
                console.error(err);
                res.sendStatus(500);
            }
        };
        console.log("reg user run");
    },

    // registrationType: function(req, res) {
    //     res.render(`RegistrationType`);
    // },

    // studentRegister: function(req, res) {
    //     res.render(`Register.hbs`);
    // },

    // labTechRegister: function(req, res) {
    //     res.render(`LabTechRegister.hbs`);
    // },

    // registerStudent: async function(req, res) {
    //     console.log(accountExist(req.body.user));
    //     if (await accountExist(req.body.user) >= 1){
    //         console.log("Username already exists");
    //         res.redirect('/studentRegister');
    //     }else{
    //         const student = new userModel({
    //             firstName: req.body.fName,
    //             lastName: req.body.lName,
    //             idNumber: req.body.
    //             dateOfBirth: req.body.birth,
    //             userName: req.body.user,
    //             password: req.body.password,
    //             userType: "studentUser"
    //         });

    //         student.save().then(val => {
    //         }).catch(error => {
    //             console.log("Insert op error: " + error);
    //         });
            
    //         res.redirect(`/`);
    //     };
    // },

    // registerLabTech: async function(req, res) {
    //     console.log(req.body.fName);
    //     console.log(req.body.lName);
    //     console.log(req.body.birth);
    //     console.log(req.body.user);
    //     console.log(req.body.password);

    //     if (await techAccountExist(req.body.user) >= 1){
    //         console.log("Username already exists");
    //         res.redirect('/labTechRegister'); 
    //     }else{
    //         const labTech = new userModel({
    //             firstName: req.body.fName,
    //             lastName: req.body.lName,
    //             dateOfBirth: req.body.birth,
    //             userName: req.body.user,
    //             password: req.body.password,
    //             userType: "labTechUser"
    //         });
    //         labTech.save().then(val => {
    //             console.log("Insert successful: ");
    //             console.log(val);
    //         }).catch(error => {
    //             console.log("Insert op error: " + error);
    //         });
    //         res.redirect('/');
    //     };
    // },
}

module.exports = registrationController;