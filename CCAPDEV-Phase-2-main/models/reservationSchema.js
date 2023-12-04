const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    reservationNumber: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    seatNum: {
        type: Number,
        required: true,
    },
    timeReserved: {
        type: String,
        required: true,
    },
    dateReserved: {
        type: String,
        required: true,
    },
    labNumber: {
        type: Number,
        required: true
    }
});

const Reservation = mongoose.model('reservation', reservationSchema);

module.exports = Reservation;