const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: true, users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

