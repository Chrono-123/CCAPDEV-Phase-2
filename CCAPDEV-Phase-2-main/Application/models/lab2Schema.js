const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const lab2Schema = new Schema({
    name: String,
    id: Number,
    numOfSeats: Number,
    dateReserved: String
});

const Lab2 = mongoose.model('lab2', lab2Schema);

module.exports = Lab2;