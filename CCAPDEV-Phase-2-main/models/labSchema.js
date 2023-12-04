const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const labSchema = new Schema({
    seats: [{type: Schema.ObjectId, ref: 'seatSchema'}],
    labNumber: {
        type: Number,
        required: true
    },
});

const Lab = mongoose.model('lab', labSchema);

module.exports = Lab;