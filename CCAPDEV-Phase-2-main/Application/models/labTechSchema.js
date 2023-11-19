const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const labTechSchema = new Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    userName: String,
    password: String,
});

const LabTech = mongoose.model('labTech', labTechSchema);

module.exports = LabTech;