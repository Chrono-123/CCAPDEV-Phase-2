const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const lab3Schema = new Schema({
    name: String,
    id: Number,
    numOfSeats: Number,
    dateReserved: String
});

const Lab3 = mongoose.model('lab3', lab3Schema);

module.exports = Lab3;