const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    image: {
        type: String,
        required: [true, "Image is required!"]
    },
    designation: {
        type: String,
        required: [true, "Designation is required!"]
    },
    position: {
        type: String,
        required: [true, "Designation is required!"]
    },
    quote: {
        type: String,
        required: [true, "Message is required!"]
    },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;
