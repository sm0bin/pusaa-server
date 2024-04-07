const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ status: 'success', message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        };
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ status: 'success', message: 'Login Successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User
            .findOneAndUpdate(
                { email: req.params.email },
                req.body,
                { new: true, runValidators: true }
            );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.createUserJWT = async (req, res) => {
//     try {
//         // await user.save();
//         // const token = jwt.sign({ email: user.email }, 'secret');
//         // res.status(201).json({ user, token });


//         const user = new User(req.body);
//         const existingUser = await User.findOne({ email: user.email });
//         if (!existingUser) {
//             const newUser = new User(user);
//             await existingUser.save();
//         }

//         const token = jwt.sign(newUser, process.env.JWT_SECRET, { expiresIn: "1h" });
//         console.log(token);
//         res.send({ token });
//     } catch (error) {
//         console.error(error.message)
//         res.status(404).send({ error: error.message });
//     }
// };

exports.createUserJWT = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });

        if (!user) {
            // If the user doesn't exist, create a new user
            user = new User(req.body);
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

