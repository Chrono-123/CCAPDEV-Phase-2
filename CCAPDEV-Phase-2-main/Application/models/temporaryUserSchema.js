const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const tempUserSchema = new Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    userName: String,
    password: String,
});

const TempUser = mongoose.model('tempUser', tempUserSchema);

module.exports = TempUser;
// export default {Student};