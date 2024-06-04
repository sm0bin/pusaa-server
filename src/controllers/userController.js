const User = require('../models/User');

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
        const users = await User.find(query, select, options);
        res
            .status(200)
            .json({ success: true, users, message: 'Users retrieved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
