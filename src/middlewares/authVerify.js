const jwt = require('jsonwebtoken');
require('dotenv').config();

const authVerify = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ message: "Unauthorized access!" });
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.decoded = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send({ message: err.message });
    }
}

module.exports = authVerify;