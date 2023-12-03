const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const reservationIdSchema = new Schema({
    idCounter: {
        type: Number,
        default: 1
    },
});

const ReservationId = mongoose.model('reservationId', reservationIdSchema);

module.exports = ReservationId;