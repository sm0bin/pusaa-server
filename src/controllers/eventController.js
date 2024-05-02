const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ status: true, events });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json({ status: true, event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}