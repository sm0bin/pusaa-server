const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const searchQuery = req.query.search;
        const regex = new RegExp(searchQuery, 'i');

        const query = {
            $or: [
                { email: regex },
                { 'profile.basic.name': regex },
                { 'profile.basic.role': regex },
                { 'profile.education.university': regex },
                { 'profile.education.department': regex },
                { 'profile.education.session': regex },
                { 'profile.contact.address': regex },
            ]
        };

        const options = {
            sort: {
                'profile.education.session': 1
            }
        };

        let users;
        if (searchQuery) {
            users = await User.find(query, {}, options);
        } else {
            users = await User.find({}, {}, options);
        }

        res.status(200).json({ status: true, users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


