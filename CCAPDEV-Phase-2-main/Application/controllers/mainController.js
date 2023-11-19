// const db = require('../app.js');
const labModel = require('../models/labSchema.js');
const studentModel = require('../models/studentSchema.js');
const labTechModel = require('../models/labTechSchema.js');
var userName;

const controller = {
    getMain: function(req, res) {
        res.render(`main`);
    },

    login: function(req, res) {
        res.render(`Login`);
    },

    checkUser: function(req, res) {
        const userName = req.body.user;
        const password = req.body.password;


        studentModel.find({userName: userName}, {password: password}, function(err, doc){
            if(err){
                console.log(err);
            }
            else{
                console.log(doc);
                this.userName = userName;
                res.redirect(`/home/` + userName);
                res.render('home');
            }
        });

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

        res.redirect(`/home/` + userName);
        // else if labTech
        // res.redirect(`/labTechHome/` + user);
    },

    getStudent: async function(req, res) {
        const userName = req.params.user;
        // var password = req.params.password;

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

    registerStudent: function(req, res) {
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
        const student = new studentModel({
            firstName: req.body.fName,
            lastName: req.body.lName,
            dateOfBirth: req.body.birth,
            userName: req.body.user,
            password: req.body.password
        });
        if (!(studentModel.find({userName: userName}))){
            student.save().then(val => {
                console.log("Insert successful: ");
                console.log(val);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });
            res.render(`main`);
        }else{
            console.alert("Username already exists");
        }

        
    },
    registerTech: function (req, res){
        const labTech = new labTechModel({
            firstName: req.body.fNameLab,
            lastName: req.body.lNameLab,
            dateOfBirth: req.body.birthLab,
            userName: req.body.userLab,
            password: req.body.passwordLab
        });
        console.log(userName);
        if (!(labTechModel.find({userName: userName}))){
            student.save().then(val => {
                console.log("Insert successful: ");
                console.log(val);
            }).catch(error => {
                console.log("Insert op error: " + error);
            });
            res.render(`main`);
        }else{
            console.alert("Username already exists");
        }
    },
    retrieveData: function(req, res){
        const query = studentModel.findOne({userName: userName});
        console.log(query);

    }
}

module.exports = controller;