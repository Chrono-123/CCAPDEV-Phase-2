import { Student } from "./models/labSchema.js";

export const getAllStudents = async() => {
    const students = await Student.find().lean();
    return students;
};

// export const getStudentByUsername = async(userName) => {
//     const student = await Student.findOne().lean();
//     return student;
// };