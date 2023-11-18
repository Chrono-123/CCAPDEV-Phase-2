const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const labSchema = new Schema({
    name: String,
    id: Number,
    numOfSeats: Number,
    dateReserved: String,
    password: String,
    // userType: {
    //     type: String,
    //     required: true    
    // },
  
    // refreshToken: String
});

const Lab1 = mongoose.model('lab1', labSchema);
const Lab2 = mongoose.model('lab2', labSchema);
const Lab3 = mongoose.model('lab3', labSchema);

module.exports = Lab1;
module.exports = Lab2;
module.exports = Lab3;
// module.exports = mongoose.model('lab1', labSchema);
// module.exports = Lab2;
// module.exports = Lab3;