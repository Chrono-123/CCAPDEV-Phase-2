const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const seatSchema = new Schema({
    reservation: [{type: Schema.ObjectId, ref: 'reservationSchema'}],
    seatNum: {
        type: Number,
        required: true,
        unique: true
    },
    labNumber: {
        type: Number,
        required: true
    },
});

const Seat = mongoose.model('seat', seatSchema);

module.exports = Seat;