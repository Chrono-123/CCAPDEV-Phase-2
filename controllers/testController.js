const mongoose = require('mongoose');
// const labModel = require('../models/labSchema.js');
// const reservationModel = require('../models/reservationSchema.js');
// const seatModel = require('../models/seatSchema.js');
const userModel = require('../models/userSchema.js');
const argon2 = require('argon2');
const crypto = require('crypto');

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
    
async function currentUserStudent(tempUserName){
    try {
        return userModel.findOne({userName: tempUserName, userType: "studentUser"}).then(studentUser => {
            console.log("awman", studentUser);
            if(studentUser == null)
                return false;
            else {
                return true;
            }
        });
    }
    catch(e) {
        console.log('Catch an error: ', e)
    };
};

async function currentUserLabTech(tempUserName){
    try {
        return userModel.findOne({userName: tempUserName, userType: "labTechUser"}).then(labTechUser => {
            console.log("awman", labTechUser);
            if(labTechUser == null)
                return false;
            else {
                return true;
            }
        });
    }
    catch(e) {
        console.log('Catch an error: ', e)
    };

    // return currentUserLabTech;
};

async function userSearchStudent(userName){
    try {
        return userModel.findOne({userName: userName, userType: "studentUser"}).then(studentUser => {
            console.log("awman", studentUser);
            if(studentUser == null)
                return false;
            else {
                return true;
            }
        });
    }
    catch(e) {
        console.log('Catch an error: ', e)
    };

    // return userSearchStudent;
};

async function userSearchLabTech(userName){
    try {
        return userModel.findOne({userName: userName, userType: "labTechUser"}).then(labTechUser => {
            console.log("awman", labTechUser);
            if(labTechUser == null)
                return false;
            else {
                return true;
            }
        });
    }
    catch(e) {
        console.log('Catch an error: ', e)
    };

    // return userSearchLabTech;
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
    try {
        const exists = userModel.find({
            userName: username,
            userType: 'studentUser'
        },
        {
            userName: 1
        });
    }
    catch(e) {
        console.log('Catch an error: ', e)
    };

    console.log("number of items:" + exists.length);
    if (exists.length <= 0){
        return false;
    }else{
        return true;
    };
};

async function techAccountExist(username){
    try {
        const exists = userModel.find({
            userName: username,
            userType: 'labTechUser'
        },
        {
            userName: 1
        });
    }
    catch(e) {
        console.log('Catch an error: ', e)
    };

    console.log("number of tech items:" + exists.length);
    if (exists.length <= 0){
        return false;
    }else{
        return true;
    };
};

module.exports = { verifyPassword, accountExist, techAccountExist, hashPassword, currentUserStudent, currentUserLabTech, userSearchStudent, userSearchLabTech };