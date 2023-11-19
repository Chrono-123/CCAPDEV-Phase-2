//const db = require('../app.js');
const labModel = require('../models/labSchema.js');
const studentModel = require('../models/studentSchema.js');
const labTechModel = require('../models/labTechSchema.js');

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
    getMain: function(req, res) {
        res.render(`main`);
    },

    login: function(req, res) {
        res.render(`Login`);
    },

    checkUser: async function(req, res) {
        const userName = req.body.user;
        const password = req.body.password;

        
        // console.log(await studentModel.findOne({userName: userName}));
        studentModel.findOne({userName: userName, password: password}).then(user => {
            console.log("User found: ");
            console.log(user);
            console.log(user.password);
            res.redirect(`/home/` + user);
        }).catch(error => {
            console.log("Insert op error: " + error);
        });
        
        // , function(err, doc){
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         console.log(doc);
        //         id = doc.getId();
        //         res.redirect(`/home/` + userName);
        //         res.render('home');
        //     }
        // });
        // studentModel.find( { $or: [ {userName: user} ] }, ( err, students ) => {
        //     if( err ){ return console.log( err ); }
        //     else{
        //         if( students ){
        //             if( students.length > 0 ){
        //                 for( let i = 0; i < students.length; i++ ){
        //                     let hasName = ( students[i].userName == user );
        //                     if( hasName ){
        //                         res.redirect(`/home/` + userName);;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // });

        // res.redirect(`/home/` + userName);
        // else if labTech
        // res.redirect(`/labTechHome/` + user);
    },

    getStudent: function(req, res) {
        const user = req.params.user;
        // var password = req.params.password;

        console.log(user);
        res.render(`Home`);
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
        res.render('Register.hbs');
    },

    labTechRegister: function(req, res) {
        res.render('LabTechRegister.hbs');
    },

    registerStudent: async function(req, res) {
        // studentModel.find( { $or: [ {userName: user} ] }, ( err, students ) => {
        //     if( err ){ return console.log( err ); }
        //     else{
        //         if( students ){
        //             if( students.length > 0 ){
        //                 for( let i = 0; i < students.length; i++ ){
        //                     let hasName = ( students[i].userName == user );
        //                     if( hasName ){
        //                         return console.log( 'Name already exists.' );
        //                     }
        //                 }
        //             }
        //         } else{

        //             // If email or username is unique / not exists in DB
        //             // then save / create a new user
        //             const student = new studentModel({
        //                 firstName: req.body.fName,
        //                 lastName: req.body.lName,
        //                 dateOfBirth: req.body.birth,
        //                 userName: req.body.user,
        //                 password: req.body.password
        //             });
        //         }
        //     }
        // });

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
    }
}

module.exports = controller;