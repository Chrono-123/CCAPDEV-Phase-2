// const Student = require('../../models/studentSchema.js');
// const LabTech = require('../../models/labTechSchema.js');
// const Lab = require('../../models/labSchema.js');
// const bcrypt = require('bcrypt');
import { Lab1, Lab2, Lab3 } from "./models/labSchema.js";

export const getAllLab1 = async() => {
    const Labs = await Lab1.find().lean();
    return Labs;
};

// export const getLab1ById = async(id) => {
//     const 
// }

// module.exports = {handleNewStudent};

// connectToMongo((error) => {
    
//     console.log("Connected to MongoDB server")

//     if (error) {
//         console.log("error occured:");
//         console.error(error);
//         process.exit();
//     }

//     console.log("Connected to MongoDB server")

//     const db = getDb();
//     // const data = {fname, lname, birth, user, password} = req.body;
//     // db.collection("test").insertOne({
//     //     firstName: "Sean",
//     //     lastName: "Lim",
//     //     dateOfBirth: "11/10/01",
//     //     userName: "Jesus",
//     //     password: "Iamjesus"
//     // }).then(val => {
//     //     console.log("Insert successful: ");
//     //     console.log(val);
//     // }).catch(error => {
//     //     console.log("Insert op error: " + error);
//     // });

//     const register = app.get('/html/register');
//     console.log(register);
//     app.psotget('/html/register', function(req, res) {
//         db.collection("test").insertOne({
//             firstName: req.body.fName,
//             lastName: req.body.lName,
//             dateOfBirth: req.body.birth,
//             userName: req.body.user,
//             password: req.body.password
//         }).then(val => {
//             console.log("Insert successful: ");
//             console.log(val);
//         }).catch(error => {
//             console.log("Insert op error: " + error);
//         });
//     });
// });
