const Testimonial = require('../models/Testimonial');

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json({ status: true, testimonials });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}