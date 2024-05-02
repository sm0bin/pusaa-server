const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required!"]
    },
    date: {
        type: Date,
        required: [true, "Date is required!"]
    },
    location: {
        type: String,
        required: [true, "Location is required!"]
    },
    image: {
        type: String,
        required: [true, "Image is required!"]
    },
    summery: {
        type: String,
        required: [true, "Summery is required!"]
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;