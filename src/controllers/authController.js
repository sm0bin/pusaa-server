const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.jwt = async (req, res) => {
    try {
        const user = req.body;
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'none'
        // }).send({ success: true });
        res.send({
            success: true,
            token: token,
            message: 'Token generated successfully'
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProfile = async (req, res) => {

    try {
        // Retrieve the user from the database using the decoded token
        const user = await User.findOne({ email: req.decoded.email });
        console.log('User:', user);

        res.status(200).json({
            status: true,
            user,
            message: 'User profile retrieved successfully'
        });
    } catch (error) {
        console.error('Error retrieving user from database:', error.message);
        res.status(500).json({ message: 'Error retrieving user from database' });
    }
}

exports.createProfile = async (req, res) => {
    try {
        // Retrieve the user from the database using the decoded token
        const user = await User.findOne({ email: req.decoded.email });
        console.log('User:', user);
        if (user) {
            return res.status(400).json({ message: 'Profile already exists' });
        }
        // Create the user's profile
        const newUser = new User({ ...decoded, profile: req.body });
        await newUser.save();

        res.status(201).json({ status: true, message: 'Profile created successfully' });
    } catch (error) {
        console.error('Error creating user profile:', error.message);
        res.status(500).json({ message: 'Error creating user profile' });
    }
}

exports.updateProfile = async (req, res) => {

    try {
        // Retrieve the user from the database using the decoded token
        const user = await User.findOne({ email: decoded.email });
        console.log('User:', user);

        // Update the user's profile
        user.profile = req.body;
        await user.save();

        res.status(200).json({ status: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ message: 'Error updating user profile' });
    }
}

// exports.signupUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).json({ status: true, message: 'User created successfully' });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) {
//             return res.status(400).json({ message: 'Invalid password' });
//         };
//         const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET);
//         res.cookie('token', token, { httpOnly: true });
//         res.status(200).json({ status: true, message: 'Login Successful' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASSWORD
//             }
//         });

//         const mailOptions = {
//             from: 'youremail@gmail.com',
//             to: email,
//             subject: 'Sending Email using Node.js',
//             text: `Click on the link to reset your password: http://localhost:5173/reset-password/${token}`
//         };

//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         });
//         res.status(200).json({ status: true, message: 'Email sent successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.resetPassword = async (req, res) => {
//     try {
//         const { token } = req.params;
//         const { password } = req.body;
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const id = decoded.id;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ status: true, message: 'Password reset successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.verifyUser = async (req, res) => {
//     return res.status(200).json({ status: true, message: 'User verified' });
// }

// exports.logoutUser = async (req, res) => {
//     try {
//         res.clearCookie('token');
//         res.status(200).json({ status: true, message: 'Logout Successful' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



