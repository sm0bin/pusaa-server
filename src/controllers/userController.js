const User = require('../models/User');
const jwt = require('jsonwebtoken');
const roles = require('../utils/data');

exports.getAllUsers = async (req, res) => {
    try {
        const searchQuery = req.query.search;
        const token = req.cookies.token;
        const regex = new RegExp(searchQuery, 'i');

        let query = {
            'profile': { $ne: null }
        };

        if (searchQuery) {
            query.$or = [
                { email: regex },
                { 'profile.basic.name': regex },
                { 'profile.basic.role': regex },
                { 'profile.education.university': regex },
                { 'profile.education.department': regex },
                { 'profile.education.session': regex },
                { 'profile.contact.address': regex },
            ];
        }

        let select = {
            password: 0,
            'profile.contact.phone': 0,
            'profile.contact.whatsapp': 0
        };

        const options = {
            sort: {
                'profile.education.session': 1
            }
        };

        if (token) {
            try {
                // Verify and decode the token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log('Decoded token:', decoded);

                // Retrieve the user from the database using the decoded token
                const user = await User.findById(decoded._id).select('-password');
                console.log('User:', user);

                if (roles.includes(user.profile.basic.role)) {
                    select = {
                        password: 0
                    };
                }
            } catch (error) {
                console.error('Error decoding or retrieving user:', error.message);
                return res.status(401).json({ message: 'Invalid token' });
            }
        }

        const users = await User.find(query, select, options);
        res.status(200).json({ status: true, users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
