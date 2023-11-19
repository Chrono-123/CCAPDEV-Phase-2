const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const lab1Schema = new Schema({
    name: String,
    id: Number,
    numOfSeats: Number,
    dateReserved: String
});

const Lab1 = mongoose.model('lab1', lab1Schema);

module.exports = Lab1;