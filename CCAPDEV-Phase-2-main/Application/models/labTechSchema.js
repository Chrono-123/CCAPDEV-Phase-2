import mongoose from "mongoose";
const Schema = mongoose.Schema;

const labTechSchema = new Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    userName: String,
    password: String,
    // userType: {
    //     type: String,
    //     required: true    
    // },
  
    // refreshToken: String
});

const LabTech = mongoose.model('labTech', labTechSchema);

export default {LabTech};