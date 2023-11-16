import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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

const Student = mongoose.model('student', studentSchema);

export default {Student};